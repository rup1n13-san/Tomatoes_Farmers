/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import useFavoritesStore from "@/lib/stores/favoritesStore";
import Link from "next/link";

export default function WishlistPage() {
  const { favorites, loading, fetchFavorites
     , userId
 } = useFavoritesStore();
// const userId = "6915ae03947c81e0786d6bcc"
  useEffect(() => {
    if (!userId) return;
    fetchFavorites();
  }, [userId, fetchFavorites]);

  if (!userId) {
    
    return (
      <div className="px-4 py-6 text-neutral-200">
        Please log in to see your wishlist.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="px-4 py-6 text-neutral-200">Loading wishlist...</div>
    );
  }

  return (
		<div className='px-4 py-6'>
			<h1 className='mb-4 text-xl font-semibold text-neutral-100'>My Wishlist</h1>

			{favorites.length === 0 ? (
				<p className='text-sm text-neutral-500'>No favorites yet.</p>
			) : (
				<div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
					{favorites.map((fav) => (
						<div
							key={fav._id}
							className='rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden'
						>
							<div className='relative w-full aspect-4/6'>
								<img
									src={fav.movie.posterPath}
									alt={fav.movie.title}
									className='absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]'
								/>
							</div>
							<div className='px-3 py-3 text-xs text-neutral-200'>
								<Link href={`/movies/${fav.movie._id}`} className='truncate text-sm Link-semibold'>{fav.movie.title}</Link>
								<div className='mt-2 text-[10px] text-neutral-500'>
									Added: {new Date(fav.createdAt).toLocaleString()}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
