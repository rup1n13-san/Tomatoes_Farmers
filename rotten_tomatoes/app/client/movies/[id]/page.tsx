/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import useMoviesStore from '@/lib/MoviesStore';
import MovieDetails from '@/components/MovieDetails';
import MovieComments from '@/components/MovieComments';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';

export default function MoviePage() {
	const { id } = useParams();
	const { oneMovie, isLoading, errorMovie, fetchOneMovie } = useMoviesStore();

	useEffect(() => {
		if (id && typeof id === 'string') {
			fetchOneMovie(id);
		}
	}, [id]);


	if (isLoading) {
		return (
			<div className='min-h-screen bg-black'>
				<Header />
				<div className='mx-auto max-w-7xl px-4 py-12'>
					{/* Hero Section Skeleton */}
					<div className='mb-12 animate-pulse'>
						<div className='grid gap-8 lg:grid-cols-3'>
							{/* Poster Skeleton */}
							<div className='lg:col-span-1'>
								<div className='aspect-2/3 w-full rounded-2xl bg-neutral-800' />
							</div>

							{/* Details Skeleton */}
							<div className='lg:col-span-2'>
								<div className='space-y-6'>
									{/* Title */}
									<div className='h-12 w-3/4 rounded-lg bg-neutral-800' />

									{/* Metadata */}
									<div className='flex gap-4'>
										<div className='h-6 w-20 rounded bg-neutral-800' />
										<div className='h-6 w-24 rounded bg-neutral-800' />
										<div className='h-6 w-16 rounded bg-neutral-800' />
									</div>

									{/* Rating */}
									<div className='h-20 w-40 rounded-xl bg-neutral-800' />

									{/* Description */}
									<div className='space-y-3'>
										<div className='h-4 w-full rounded bg-neutral-800' />
										<div className='h-4 w-full rounded bg-neutral-800' />
										<div className='h-4 w-2/3 rounded bg-neutral-800' />
									</div>

									{/* Buttons */}
									<div className='flex gap-3'>
										<div className='h-12 w-32 rounded-lg bg-neutral-800' />
										<div className='h-12 w-32 rounded-lg bg-neutral-800' />
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Comments Section Skeleton */}
					<div className='animate-pulse'>
						<div className='mb-6 h-8 w-48 rounded-lg bg-neutral-800' />
						<div className='space-y-4'>
							{[1, 2, 3].map((i) => (
								<div key={i} className='rounded-xl border border-neutral-800 bg-neutral-900 p-6'>
									<div className='flex items-start gap-4'>
										<div className='h-10 w-10 rounded-full bg-neutral-800' />
										<div className='flex-1 space-y-3'>
											<div className='h-4 w-32 rounded bg-neutral-800' />
											<div className='h-3 w-full rounded bg-neutral-800' />
											<div className='h-3 w-5/6 rounded bg-neutral-800' />
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}


	if (errorMovie) {
		return (
			<div className='min-h-screen bg-black'>
				<Header />
				<div className='flex min-h-[60vh] items-center justify-center px-4'>
					<div className='text-center'>
						<div className='mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10'>
							<svg
								className='h-10 w-10 text-red-500'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						</div>
						<h2 className='mb-2 text-2xl font-bold text-white'>Oops! Something went wrong</h2>
						<p className='mb-6 text-neutral-400'>{errorMovie}</p>
						<button
							onClick={() => window.location.reload()}
							className='rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-500'
						>
							Try Again
						</button>
					</div>
				</div>
				<Footer />
			</div>
		);
	}


	if (!oneMovie) {
		return (
			<div className='min-h-screen bg-black'>
				<Header />
				<div className='flex min-h-[60vh] items-center justify-center px-4'>
					<div className='text-center'>
						<div className='mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-neutral-800'>
							<svg
								className='h-10 w-10 text-neutral-400'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z'
								/>
							</svg>
						</div>
						<h2 className='mb-2 text-2xl font-bold text-white'>Movie Not Found</h2>
						<p className='mb-6 text-neutral-400'>We couldn&apos;t find the movie you&apos;re looking for.</p>
						<Link
							href='/'
							className='inline-block rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-500'
						>
							Back to Home
						</Link>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	// Success State
	return (
		<div className='bg-black'>
			<Header />
			<MovieDetails movie={oneMovie} />
			<MovieComments movieId={id} />
			<Footer />
		</div>
	);
}
