'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerUser } from '@/lib/authApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setconfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			await registerUser(name, email, password, confirmPassword);

			router.push('/auth/login');
		} catch (err: any) {
			setError(err.response?.data?.error || 'Registration failed');
		} finally {
			setLoading(false);
		}
	}
	return (
		<div className='bg-[url("/images/login.webp")] h-screen'>
			<div className='min-h-screen  flex items-center justify-center p-4'>
				<div className='max-w-lg w-full bg-black/60 rounded-xl shadow-lg p-8'>
					<h2 className='text-2xl font-bold text mb-6 text-center text-red-600'>Sign Up</h2>

					<form className='space-y-4' onSubmit={handleSubmit}>
						<div>
							<label className='block text-sm font-medium text-gray-300 mb-1'>Username</label>
							<input
								type='name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								className='text-white w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-black'
								placeholder='your name'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-300 mb-1'>Email</label>
							<input
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='text-white w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-black'
								placeholder='your@email.com'
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-300 mb-1'>Password</label>
							<input
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='text-white w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-black'
								placeholder='••••••••'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-300 mb-1'>
								Confirm password
							</label>
							<input
								type={showPassword ? 'text' : 'password'}
								value={confirmPassword}
								onChange={(e) => setconfirmPassword(e.target.value)}
								className='text-white w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-black'
								placeholder='••••••••'
							/>
						</div>
						<button
							type='button'
							onClick={() => {
								setShowPassword(!showPassword);
							}}
							className='float-right mt-1'
						>
							{showPassword ? (
								<svg
									width='30px'
									height='30px'
									viewBox='0 0 24 24'
									fill='#ffffff'
									xmlns='http://www.w3.org/2000/svg'
									stroke='#ffffff'
								>
									<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
									<g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
									<g id='SVGRepo_iconCarrier'>
										{' '}
										<g id='Edit / Show'>
											{' '}
											<g id='Vector'>
												{' '}
												<path
													d='M3.5868 13.7788C5.36623 15.5478 8.46953 17.9999 12.0002 17.9999C15.5308 17.9999 18.6335 15.5478 20.413 13.7788C20.8823 13.3123 21.1177 13.0782 21.2671 12.6201C21.3738 12.2933 21.3738 11.7067 21.2671 11.3799C21.1177 10.9218 20.8823 10.6877 20.413 10.2211C18.6335 8.45208 15.5308 6 12.0002 6C8.46953 6 5.36623 8.45208 3.5868 10.2211C3.11714 10.688 2.88229 10.9216 2.7328 11.3799C2.62618 11.7067 2.62618 12.2933 2.7328 12.6201C2.88229 13.0784 3.11714 13.3119 3.5868 13.7788Z'
													stroke='#000000'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
												></path>{' '}
												<path
													d='M10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12Z'
													stroke='#000000'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
												></path>{' '}
											</g>{' '}
										</g>{' '}
									</g>
								</svg>
							) : (
								<svg
									width='20px'
									height='20px'
									viewBox='0 0 1024 1024'
									xmlns='http://www.w3.org/2000/svg'
									fill='#000000'
								>
									<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
									<g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
									<g id='SVGRepo_iconCarrier'>
										<path
											d='M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z'
											fill='#ffffff'
										></path>
										<path
											d='M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z'
											fill='#ffffff'
										></path>
									</g>
								</svg>
							)}
						</button>

						{error && <p className='text-sm text-red-500 text-center'>{error}</p>}

						<button
							type='submit'
							disabled={loading}
							className='w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50'
						>
							{loading ? 'Signing up...' : 'Sign Up'}
						</button>
					</form>

					<div className='mt-6 text-center text-sm text-gray-300'>
						Don&apos;t have an account?
						<Link href='/auth/login' className='text-red-600 hover:text-red-500 font-medium'>
							Sign in
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
