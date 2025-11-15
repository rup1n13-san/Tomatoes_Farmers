import { NextResponse } from "next/server";

import Movie from "@/models/Movie";

export async function GET() {
    let movies = null
    try {
        movies = await Movie.find().sort({averageRating: -1}).limit(5)
        const allmovies = movies.map((m) => ({
            id: m.id,
            title: m.title,
            raiting:m.averageRating,
            realease:m.releaseDate,
            path:m.posterPath,


        }))
        
        return NextResponse.json(allmovies, { status: 200 });
    } catch (err) {
        console.log(err);

    }
}