'use client';

import { CheckCircle, Home, LogIn, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function AccountVerifiedContent() {
	const searchParams = useSearchParams();
	const status = searchParams?.get('status');
	const isSuccess = status === 'success';

	return (
		<div className='min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4'>
			<div className='max-w-md w-full text-center'>
				{/* Icon */}
				<div className='mb-8 flex justify-center'>
					<div className='relative'>
						{isSuccess ? (
							<>
								<div className='absolute inset-0 bg-green-200 rounded-full blur-xl opacity-50 animate-pulse'></div>
								<div className='relative bg-green-100 rounded-full p-6'>
									<CheckCircle className='w-16 h-16 text-green-600' strokeWidth={1.5} />
								</div>
							</>
						) : (
							<>
								<div className='absolute inset-0 bg-red-200 rounded-full blur-xl opacity-50 animate-pulse'></div>
								<div className='relative bg-red-100 rounded-full p-6'>
									<XCircle className='w-16 h-16 text-red-600' strokeWidth={1.5} />
								</div>
							</>
						)}
					</div>
				</div>

				{/* Title */}
				<h2 className={`text-3xl font-bold mb-3 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
					{isSuccess ? 'Account Activated!' : 'Verification Failed'}
				</h2>

				{/* Description */}
				<p className='text-gray-600 mb-8 leading-relaxed'>
					{isSuccess
						? 'Your email has been successfully verified. You can now log in and start exploring movies!'
						: "We couldn't verify your account. The link may be invalid or expired. Please try again or contact support."}
				</p>

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row gap-3 justify-center'>
					{isSuccess ? (
						<>
							<Link
								href='/auth/login'
								className='inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-500 transition-all shadow-md hover:shadow-lg active:scale-95'
							>
								<LogIn className='w-5 h-5' />
								Login Now
							</Link>

							<Link
								href='/'
								className='inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border-2 border-gray-300 hover:border-green-600 hover:text-green-600 transition-all shadow-sm hover:shadow-md active:scale-95'
							>
								<Home className='w-5 h-5' />
								Explore Movies
							</Link>
						</>
					) : (
						<>
							<Link
								href='/'
								className='inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-500 transition-all shadow-md hover:shadow-lg active:scale-95'
							>
								<Home className='w-5 h-5' />
								Back to Home
							</Link>

							<Link
								href='/auth/register'
								className='inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border-2 border-gray-300 hover:border-red-600 hover:text-red-600 transition-all shadow-sm hover:shadow-md active:scale-95'
							>
								Register Again
							</Link>
						</>
					)}
				</div>

				{/* Additional Info */}
				<div className='mt-12 pt-8 border-t border-gray-200'>
					<p className='text-sm text-gray-500'>
						{isSuccess ? (
							<>
								Welcome to{' '}
								<span className='font-semibold text-gray-700'>Rotten Tomato by the Farmers</span>!
								🍅
							</>
						) : (
							<>
								Need help?{' '}
								<Link
									href='/auth/login'
									className='text-red-600 hover:text-red-500 font-medium underline'
								>
									Try logging in
								</Link>{' '}
								or contact support.
							</>
						)}
					</p>
				</div>
			</div>
		</div>
	);
}

export default function AccountVerifiedPage() {
	return (
		<Suspense
			fallback={
				<div className='min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center'>
					<div className='text-center'>Loading...</div>
				</div>
			}
		>
			<AccountVerifiedContent />
		</Suspense>
	);
}
