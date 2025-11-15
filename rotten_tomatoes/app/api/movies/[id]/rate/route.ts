import { NextResponse } from "next/server";
import connectionDatabase from "@/lib/mongoose";
import Movie from "@/models/Movie";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const body = await req.json();
  const rating = body.rating;

  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
  }

  await connectionDatabase();

  const movie = await Movie.findById(id);
  if (!movie) {
    return NextResponse.json({ error: "Movie not found" }, { status: 404 });
  }

  const totalRatings = movie.totalRatings + 1;
  const averageRating =
    (movie.averageRating * movie.totalRatings + rating) / totalRatings;

  movie.averageRating = averageRating;
  movie.totalRatings = totalRatings;

  await movie.save();

  return NextResponse.json({
    averageRating,
    totalRatings
  });
}
