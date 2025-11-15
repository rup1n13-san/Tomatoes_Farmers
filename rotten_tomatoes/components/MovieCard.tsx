/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Play, Info } from "lucide-react";
import useFavoritesStore from "@/lib/stores/favoritesStore";

type Movie = {
	_id: string;
	title: string;
	posterPath: string;
	videoLink?: string;
};

export default function MovieCard({ data }: { data: Movie }) {
  const { isFavorite, toggleFavorite, loading } = useFavoritesStore();

  const favorite = isFavorite(data._id);

  async function handleToggleFavorite() {
    if (loading) return;
    await toggleFavorite(data._id);
  }

  return (
		<div className='group relative overflow-hidden rounded-2xl bg-neutral-900'>
			<div className='relative w-full aspect-2/3'>
				<img
					src={data.posterPath}
					alt={data.title}
					className='absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]'
				/>
			</div>
			<div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100' />

			<div className='absolute inset-x-3 bottom-3 flex flex-col gap-2 translate-y-4 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100'>
				<div className='line-clamp-1 text-sm font-semibold text-white'>{data.title}</div>

				<div className='flex items-center gap-2'>
					<Link
						href={data.videoLink || '#'}
						target='_blank'
						className='inline-flex items-center gap-2 rounded-xl bg-red-600 px-2 py-1 text-xs font-semibold text-white'
					>
						<Play className='h-4 w-4' /> Play Now
					</Link>

					<button
						onClick={handleToggleFavorite}
						disabled={loading}
						className='rounded-xl h-10 w-10  bg-white/10 px-3 py-2 text-xs font-semibold text-white disabled:opacity-60'
					>
						{/* <Plus className="mr-1 inline-block h-4 w-4" /> */}
						{favorite ? '❤️' : '♡'}
					</button>

					<Link
						href={`/client/movies/${data._id}`}
						className='rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white'
					>
						<Info className='mr-1 inline-block h-4 w-4' /> Details
					</Link>
				</div>
			</div>
		</div>
	);
}
