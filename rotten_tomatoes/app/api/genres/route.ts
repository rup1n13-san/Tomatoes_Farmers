import connectionDatabase from '@/lib/mongoose';
import axios from 'axios';
import { NextResponse } from 'next/server';

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

const axiosClient = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
	}
});

export async function POST() {
	await connectionDatabase();

	try {
    const { data: genreData } = await axiosClient.get('/genre/movie/list');
  
    return NextResponse.json(genreData);
	} catch (err) {
		console.error('Error while getting movies:', err);
		return NextResponse.json({ error: 'Error while getting movies' }, { status: 500 });
	}
}
