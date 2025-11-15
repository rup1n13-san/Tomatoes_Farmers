'use client';

import { ArrowLeft, FileQuestion, Home, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4'>
			<div className='max-w-2xl w-full text-center'>
				{/* Animated 404 Illustration */}
				<div className='mb-8 flex justify-center relative'>
					<div className='relative'>
						<div className='absolute inset-0 bg-red-200 rounded-full blur-3xl opacity-30 animate-pulse'></div>
						<div className='relative'>
							<h1 className='text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-600 to-orange-500'>
								404
							</h1>
						</div>
					</div>
				</div>

				{/* Icon */}
				<div className='mb-6 flex justify-center'>
					<div className='bg-red-100 rounded-full p-4'>
						<FileQuestion className='w-12 h-12 text-red-600' strokeWidth={1.5} />
					</div>
				</div>

				{/* Title */}
				<h2 className='text-3xl font-bold text-gray-900 mb-4'>Oops! Page Not Found</h2>

				{/* Description */}
				<p className='text-gray-600 mb-8 leading-relaxed max-w-md mx-auto'>
					The page you&apos;re looking for seems to have wandered off. It might have been moved,
					deleted, or never existed in the first place.
				</p>

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row gap-3 justify-center mb-12'>
					<Link
						href='/'
						className='inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-500 transition-all shadow-md hover:shadow-lg active:scale-95'
					>
						<Home className='w-5 h-5' />
						Back to Home
					</Link>

					<button
						onClick={() => window.history.back()}
						className='inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border-2 border-gray-300 hover:border-red-600 hover:text-red-600 transition-all shadow-sm hover:shadow-md active:scale-95'
					>
						<ArrowLeft className='w-5 h-5' />
						Go Back
					</button>
				</div>

				{/* Helpful Links */}
				<div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
					<p className='text-sm font-medium text-gray-700 mb-4'>Looking for something specific?</p>
					<div className='flex flex-wrap gap-3 justify-center'>
						<Link
							href='/admin'
							className='text-sm text-gray-600 hover:text-red-600 transition-colors underline'
						>
							Admin Dashboard
						</Link>
						<span className='text-gray-300'>•</span>
						<Link
							href='/favorites'
							className='text-sm text-gray-600 hover:text-red-600 transition-colors underline'
						>
							My Favorites
						</Link>
						<span className='text-gray-300'>•</span>
						<Link
							href='/auth/login'
							className='text-sm text-gray-600 hover:text-red-600 transition-colors underline'
						>
							Login
						</Link>
						<span className='text-gray-300'>•</span>
						<Link
							href='/auth/register'
							className='text-sm text-gray-600 hover:text-red-600 transition-colors underline'
						>
							Register
						</Link>
					</div>
				</div>

				{/* Search Suggestion */}
				<div className='mt-8 pt-8 border-t border-gray-200'>
					<div className='flex items-center justify-center gap-2 text-sm text-gray-500'>
						<Search className='w-4 h-4' />
						<span>Try searching for movies on the homepage</span>
					</div>
				</div>
			</div>
		</div>
	);
}
