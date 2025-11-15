/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";

type Movie = {
  _id: string;
  tmdbId: number;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  backdropPath: string;
  genres: string[];
  director?: string;
  originalLanguage: string;
  averageRating: number;
  totalRatings: number;
};

interface MovieDetailsProps {
  movie: Movie;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  if (!movie) return <p className="text-center text-gray-400">Aucun film sélectionné.</p>;

  const [currentRating, setCurrentRating] = useState<number>(movie.averageRating);
  const [totalVotes, setTotalVotes] = useState<number>(movie.totalRatings);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);

  const handleRate = async (rating: number) => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await axios.put(`/api/movies/${movie._id}/rate`, { rating });
      setCurrentRating(res.data.averageRating);
      setTotalVotes(res.data.totalRatings);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative w-full text-white">
      <div className="relative h-[400px] w-full">
        <Image src={movie.backdropPath} alt={movie.title} fill className="object-cover object-top opacity-50" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 md:px-10 -mt-40 relative z-10 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <Image
            src={movie.posterPath}
            alt={movie.title}
            width={300}
            height={450}
            className="rounded-2xl shadow-lg border border-gray-800"
          />
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
            <span>{new Date(movie.releaseDate).getFullYear()}</span>
            <span className="px-2 py-1 rounded-full bg-gray-800 text-gray-200 uppercase text-xs">
              {movie.originalLanguage}
            </span>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-blue-700/30 text-blue-300 rounded-full text-xs font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>

          <div className="pt-3">
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-white">Director:</span> {movie.director || "Unknown"}
            </p>

            <p className="text-sm text-gray-400 flex items-center gap-2">
              <span className="font-semibold text-white">Rating:</span> 
              {currentRating.toFixed(1)} ({totalVotes} votes)
            </p>

            {/* Rating stars */}
            <div className="flex mt-2 gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => handleRate(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={(hoverRating || currentRating) >= star ? "yellow" : "none"}
                  viewBox="0 0 24 24"
                  stroke="yellow"
                  className="w-6 h-6 cursor-pointer transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.286 7.033a1 1 0 00.95.69h7.376c.969 0 1.371 1.24.588 1.81l-5.972 4.354a1 1 0 00-.364 1.118l2.287 7.033c.3.921-.755 1.688-1.538 1.118l-5.973-4.353a1 1 0 00-1.176 0l-5.972 4.353c-.783.57-1.838-.197-1.538-1.118l2.287-7.033a1 1 0 00-.364-1.118L2.849 12.46c-.783-.57-.38-1.81.588-1.81h7.376a1 1 0 00.95-.69l2.286-7.033z"
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
