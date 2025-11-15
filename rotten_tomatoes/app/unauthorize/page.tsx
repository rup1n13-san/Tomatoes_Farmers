'use client';

import { Home, LogIn, ShieldX } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
	return (
		<div className='min-h-screen bg-linear-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-4'>
			<div className='max-w-md w-full text-center'>
				{/* Icon */}
				<div className='mb-8 flex justify-center'>
					<div className='relative'>
						<div className='absolute inset-0 bg-red-200 rounded-full blur-xl opacity-50 animate-pulse'></div>
						<div className='relative bg-red-100 rounded-full p-6'>
							<ShieldX className='w-16 h-16 text-red-600' strokeWidth={1.5} />
						</div>
					</div>
				</div>

				{/* Error Code */}
				<h1 className='text-8xl font-bold text-red-600 mb-4'>403</h1>

				{/* Title */}
				<h2 className='text-3xl font-bold text-gray-900 mb-3'>Access Denied</h2>

				{/* Description */}
				<p className='text-gray-600 mb-8 leading-relaxed'>
					You don&apos;t have permission to access this page. Please log in with the appropriate
					account or contact an administrator if you believe this is an error.
				</p>

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row gap-3 justify-center'>
					<Link
						href='/'
						className='inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-500 transition-all shadow-md hover:shadow-lg active:scale-95'
					>
						<Home className='w-5 h-5' />
						Back to Home
					</Link>

					<Link
						href='/auth/login'
						className='inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border-2 border-gray-300 hover:border-red-600 hover:text-red-600 transition-all shadow-sm hover:shadow-md active:scale-95'
					>
						<LogIn className='w-5 h-5' />
						Login
					</Link>
				</div>

				{/* Additional Help */}
				<div className='mt-12 pt-8 border-t border-gray-200'>
					<p className='text-sm text-gray-500'>
						Need help?{' '}
						<Link
							href='/auth/register'
							className='text-red-600 hover:text-red-500 font-medium underline'
						>
							Create an account
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
