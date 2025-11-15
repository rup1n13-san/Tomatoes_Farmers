/* eslint-disable @next/next/no-img-element */

export default function HeroSection() {
  return (
		<section className='relative isolate'>
			<div className='absolute inset-0'>
				<img
					src='https://image.tmdb.org/t/p/original/w3Bi0wygeFQctn6AqFTwhGNXRwL.jpg'
					alt='Featured movie'
					className=' w-full object-cover sm:h-[70vh]'
				/>
				<div className='absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent' />
			</div>

			<div className='relative mx-auto flex h-[60vh] max-w-7xl items-end px-4 pb-10 sm:h-[70vh]'>
				<div className='max-w-2xl'>
					<span className='mb-3 inline-block rounded-lg bg-white/10 px-2 py-1 text-xs font-semibold text-white backdrop-blur'>
						Action • Adventure • 2h 30m
					</span>

					<h1 className='text-3xl font-extrabold text-white sm:text-5xl'>
						Discover your next favorite film
					</h1>

					<p className='mt-3 max-w-xl text-sm text-neutral-200 sm:text-base'>
						Dive into thousands of reviews and find out if it&apos;s fresh or rotten. Get the definitive
						score from critics and fans to help you decide
					</p>

					<div className='mt-5 flex gap-3'>
						<a
							href='/register'
							className='rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-500'
						>
							Get start
						</a>
						<a
							href='#'
							className='rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20'
						>
							More Details
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
