import connectionDatabase from '@/lib/mongoose';
import Movie, { IMovie } from '@/models/Movie';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectionDatabase();

		const { id } = await params;

		const movie = await Movie.findById(id);

		if (!movie) {
			return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
		}

		return NextResponse.json(movie, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: 'Error fetching movie' }, { status: 500 });
	}
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectionDatabase();

		const { id } = await params;

		const moviedata: Partial<IMovie> = await request.json();

		const updateMovie = await Movie.findByIdAndUpdate(id, moviedata, {
			new: true,
			runValidators: true
		});

		if (!updateMovie) {
			return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
		}

		return NextResponse.json(updateMovie, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: 'Error while updating movies' }, { status: 500 });
	}
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectionDatabase();

		const { id } = await params;

		const deletedmovies = await Movie.findByIdAndDelete(id);

		if (!deletedmovies) {
			return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
		}

		return NextResponse.json('Movie deleted successfully', { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: 'Error while deleting movies' }, { status: 500 });
	}
}
