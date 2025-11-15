/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import FilterBar from '@/components/FilterBar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MovieCard from '@/components/MovieCard';
import useMoviesStore from '@/lib/MoviesStore';

// import {data,loading, error , fetchMovies} "@/lib/MoviesStore";
import { useAuthStore } from '@/lib/useAuthStore';
import { useFilterStore } from '@/lib/useFilterStore';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
export default function HomePage() {
	const [page, setPage] = useState(1);
	const perPage = 20;

	const { data, loading, error, fetchMovies } = useMoviesStore();
	const { reloadUser } = useAuthStore();

	const { searchQuery, selectedGenre, selectedYear, minRating, selectedLanguage, sortBy } =
		useFilterStore();

	const { ref, inView } = useInView({
		threshold: 0,
		triggerOnce: false
	});

	useEffect(() => {
		reloadUser();
	}, []);

	useEffect(() => {
		fetchMovies();
	}, [fetchMovies]);

	const filteredAndSortedMovies = useMemo(() => {
		if (!data) return [];

		const filtered = data.filter((movie) => {
			// Search
			const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());

			// Genre
			const matchesGenre = selectedGenre === 'all' || movie.genres.includes(selectedGenre);

			// Year
			const movieYear = movie.releaseDate
				? new Date(movie.releaseDate).getFullYear().toString()
				: null;
			const matchesYear = selectedYear === 'all' || movieYear === selectedYear;

			//  Language
			const matchesLanguage =
				selectedLanguage === 'all' || movie.originalLanguage === selectedLanguage;

			// Rating
			const matchesRating = movie.averageRating >= minRating;

			return matchesSearch && matchesGenre && matchesYear && matchesLanguage && matchesRating;
		});

		const sorted = [...filtered].sort((a, b) => {
			switch (sortBy) {
				case 'rating':
					// Rating (High to Low)
					return b.averageRating - a.averageRating;

				case 'rating-low':
					// Rating (Low to High)
					return a.averageRating - b.averageRating;

				case 'release-date':
					// Release Date (Newest first)
					const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
					const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
					return dateB - dateA;

				case 'release-date-old':
					// Release Date (Oldest first)
					const dateAOld = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
					const dateBOld = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
					return dateAOld - dateBOld;

				case 'title-az':
					// Title (A-Z)
					return a.title.localeCompare(b.title);

				case 'title-za':
					// Title (Z-A)
					return b.title.localeCompare(a.title);

				case 'popularity':
				default:
					// Popularity
					return (b.totalRatings || 0) - (a.totalRatings || 0);
			}
		});

		return sorted;
	}, [data, searchQuery, selectedGenre, selectedYear, selectedLanguage, sortBy, minRating]);


	// RESET when filter change
	useEffect(() => {
		setPage(1);
	}, [searchQuery, selectedGenre, selectedYear, selectedLanguage, sortBy, minRating]);


	// PAGINATION
	const displayedMovies = filteredAndSortedMovies.slice(0, page * perPage);
	const hasMore = displayedMovies.length < filteredAndSortedMovies.length;


	// INFINITE SCROLL TRIGGER
	useEffect(() => {
		if (inView && hasMore && !loading) {
			console.log('Loading more movies...');
			setPage((prev) => prev + 1);
		}
	}, [inView, hasMore, loading]);

	if (loading) {
		return (
			<div className='min-h-screen bg-neutral-950 flex items-center justify-center'>
				<div className='text-white text-xl'>Chargement des films...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='min-h-screen bg-neutral-950 flex items-center justify-center'>
				<div className='text-red-500 text-xl'>Erreur: {error}</div>
			</div>
		);
	}

	if (!data) {
		return (
			<div className='min-h-screen bg-neutral-950 flex items-center justify-center'>
				<div className='text-gray-400 text-xl'>Aucun film disponible</div>
			</div>
		);
	}

	return (
		<div className=' bg-neutral-950/70 '>
			<Header />
			<div className='mb-20'>
				<HeroSection></HeroSection>
			</div>

			<div className='my-5 max-w-7xl mx-auto'>
				<FilterBar></FilterBar>
			</div>
			{/* Results */}
			<div className='max-w-7xl mx-auto px-4 mb-8'>
				<p className='text-gray-400 text-sm'>
					{filteredAndSortedMovies.length} movie{filteredAndSortedMovies.length !== 1 ? 's' : ''}{' '}
					found
				</p>
			</div>

			{/* Movies */}
			{filteredAndSortedMovies.length > 0 ? (
				<>
					<div className='grid grid-cols-2 gap-4 mx-auto max-w-7xl px-4 sm:grid-cols-3 lg:grid-cols-5 mb-12'>
						{displayedMovies.map((item) => (
							<MovieCard key={item._id} data={item} />
						))}
					</div>

					{/* Infinite Scroll Trigger (ref) */}
					{hasMore && (
						<div ref={ref} className='max-w-7xl mx-auto px-4 py-8 flex justify-center'>
							<div className='flex items-center gap-3 text-gray-400'>
								<div className='animate-spin rounded-full h-6 w-6 border-2 border-gray-400 border-t-red-600' />
								<span className='text-sm'>Loading more movies...</span>
							</div>
						</div>
					)}

					{/* END MESSAGE */}
					{!hasMore && filteredAndSortedMovies.length > perPage && (
						<div className='max-w-7xl mx-auto px-4 py-12 text-center'>
							<div className='inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 rounded-full'>
								<span className='text-2xl'>🎬</span>
								<p className='text-gray-400 text-sm'>
									You&apos;ve reached the end! All {filteredAndSortedMovies.length} movies displayed.
								</p>
							</div>
						</div>
					)}
				</>
			) : (
				<div className='max-w-7xl mx-auto px-4 py-20 text-center'>
					<p className='text-gray-400 text-lg'>No movies match your filters</p>
					<p className='text-gray-500 text-sm mt-2'>Try adjusting your search criteria</p>
				</div>
			)}


			<div className='mt-20'>
				<Footer />
			</div>
		</div>
	);
}
