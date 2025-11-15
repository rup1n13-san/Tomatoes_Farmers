/* eslint-disable @typescript-eslint/no-explicit-any */
import connectionDatabase from '@/lib/mongoose';
import Movie from '@/models/Movie';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

const axiosClient = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
	}
});

let genreCache: Map<number, string> | null = null;

async function getGenreMap() {
	if (genreCache) {
		return genreCache;
	}

	console.log('Fetching genres from TMDB...');
	const { data } = await axiosClient.get('/genre/movie/list');
	genreCache = new Map<number, string>(data.genres.map((g: any) => [g.id, g.name]));

	return genreCache;
}

async function getMovieDirector(tmdbId: number): Promise<string> {
	try {
		const { data } = await axiosClient.get(`/movie/${tmdbId}/credits`);
		const director = data.crew.find((person: any) => person.job === 'Director');
		return director?.name || 'Unknown';
	} catch (error) {
		console.error(`Error fetching director for movie ${tmdbId}:`, error);
		return 'Unknown';
	}
}

async function getMovieVideo(tmdbId: number): Promise<string | null> {
	try {
		const { data } = await axiosClient.get(`/movie/${tmdbId}/videos`);

		// Chercher le trailer officiel
		const trailer = data.results.find(
			(video: any) => video.type === 'Trailer' && video.site === 'YouTube'
		);

		if (trailer) {
			return `https://www.youtube.com/watch?v=${trailer.key}`;
		}

		return null;
	} catch (error) {
		console.error(`Error fetching video for movie ${tmdbId}:`, error);
		return null;
	}
}

export async function GET(request: NextRequest) {
	await connectionDatabase();

	const page_param = request.nextUrl.searchParams.get('page');
	const page = page_param ? parseInt(page_param, 10) : 1;
	const query = request.nextUrl.searchParams.get('query') || null;

	try {
		const genreMap = await getGenreMap();

		let movieData;
		if (query && query.trim().length > 0) {
			({ data: movieData } = await axiosClient.get('/search/movie', {
				params: { query, page, language: 'en-US', include_adult: false }
			}));
		} else {
			({ data: movieData } = await axiosClient.get(
				`/movie/now_playing?language=en-US&page=${page}`
			));
		}

		const tmdbMoviesPromises = movieData.results.map(async (movie: any) => {
			const [director, videoLink] = await Promise.all([
				getMovieDirector(movie.id),
				getMovieVideo(movie.id)
			]);

			return {
				tmdbId: movie.id,
				title: movie.title,
				overview: movie.overview,
				releaseDate: new Date(movie.release_date),
				posterPath: movie.poster_path
					? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
					: null,
				backdropPath: movie.backdrop_path
					? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
					: null,
				genres: movie.genre_ids.map((id: number) => genreMap.get(id) || 'Unknown'),
				director,
				videoLink,
				originalLanguage: movie.original_language,
				averageRating: movie.vote_average,
				createdAt: new Date(),
				updatedAt: new Date()
			};
		});

		const tmdbMovies = await Promise.all(tmdbMoviesPromises);

		const existingMovies = await Movie.find({
			tmdbId: { $in: tmdbMovies.map((m: any) => m.tmdbId) }
		});

		const existingMap = new Map(existingMovies.map((m: any) => [m.tmdbId, m]));

		const moviesWithStatus = tmdbMovies.map((tmdbMovie: any) => {
			const existing = existingMap.get(tmdbMovie.tmdbId);

			if (existing) {
				return {
					...tmdbMovie,
					...existing.toObject(),
					status: 'saved',
					movieId: existing._id.toString()
				};
			}

			return {
				...tmdbMovie,
				status: 'new',
				movieId: null
			};
		});

		return NextResponse.json({ movies: moviesWithStatus });
	} catch (err) {
		console.error('Error while getting movies:', err);
		return NextResponse.json({ error: 'Error while getting movies' }, { status: 500 });
	}
}
