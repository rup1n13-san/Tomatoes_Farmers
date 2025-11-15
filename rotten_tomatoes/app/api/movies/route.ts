import { NextResponse } from 'next/server';
import connectionDatabase from '../../../lib/mongoose';
import Movie, { IMovie } from '@/models/Movie';

export async function POST(request: Request) {
	try {
		await connectionDatabase();
		const moviedata: IMovie = await request.json();
		console.log("Received movie data: ", moviedata);
		const newMovie = new Movie(moviedata);
		await newMovie.save();
		return NextResponse.json('Movie created', { status: 201 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: 'Error whileadding movies' }, { status: 500 });
	}
}

export async function GET() {
	try {
		await connectionDatabase();
		const movies = await Movie.find({}).sort({ createdAt: -1 });

		return NextResponse.json(movies, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: 'Error fetching movies' }, { status: 500 });
	}
}
