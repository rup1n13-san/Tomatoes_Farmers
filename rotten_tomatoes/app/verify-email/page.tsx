'use client';

import { Home, Inbox, Mail } from 'lucide-react';
import Link from 'next/link';

export default function VerifyEmailPage() {
	return (
		<div className='min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4'>
			<div className='max-w-md w-full text-center'>
				{/* Icon */}
				<div className='mb-8 flex justify-center'>
					<div className='relative'>
						<div className='absolute inset-0 bg-blue-200 rounded-full blur-xl opacity-50 animate-pulse'></div>
						<div className='relative bg-blue-100 rounded-full p-6'>
							<Mail className='w-16 h-16 text-blue-600' strokeWidth={1.5} />
						</div>
					</div>
				</div>

				{/* Title */}
				<h2 className='text-3xl font-bold text-gray-900 mb-3'>Check Your Email</h2>

				{/* Description */}
				<p className='text-gray-600 mb-6 leading-relaxed'>
					We&apos;ve sent a verification link to your email address. Please check your inbox and
					click the link to verify your account.
				</p>

				{/* Email Icon with Animation */}
				<div className='bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8'>
					<div className='flex items-center justify-center gap-3 text-blue-700'>
						<Inbox className='w-6 h-6' />
						<span className='font-medium'>Verification email sent!</span>
					</div>
				</div>

				{/* Tips */}
				<div className='text-left bg-gray-50 rounded-lg p-5 mb-8 space-y-2'>
					<p className='text-sm text-gray-700 font-medium mb-3'>Tips:</p>
					<ul className='space-y-2 text-sm text-gray-600'>
						<li className='flex items-start gap-2'>
							<span className='text-blue-600 mt-0.5'>•</span>
							<span>Check your spam or junk folder if you don&apos;t see the email</span>
						</li>
						<li className='flex items-start gap-2'>
							<span className='text-blue-600 mt-0.5'>•</span>
							<span>The verification link will expire in 24 hours</span>
						</li>
						<li className='flex items-start gap-2'>
							<span className='text-blue-600 mt-0.5'>•</span>
							<span>Make sure to check the email address you provided</span>
						</li>
					</ul>
				</div>

				{/* Action Button */}
				<div className='flex flex-col gap-3'>
					<Link
						href='/'
						className='inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-all shadow-md hover:shadow-lg active:scale-95'
					>
						<Home className='w-5 h-5' />
						Back to Home
					</Link>
				</div>

				{/* Additional Help */}
				<div className='mt-12 pt-8 border-t border-gray-200'>
					<p className='text-sm text-gray-500'>
						Didn&apos;t receive the email?{' '}
						<Link
							href='/auth/register'
							className='text-blue-600 hover:text-blue-500 font-medium underline'
						>
							Try registering again
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
