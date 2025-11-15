/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import useMoviesStore from '@/lib/MoviesStore';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import EditMovieModal from '../component/EditMovieModal';
import ShowMoviesModal from '../component/Mshow';

export default function MoviesPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const [movieOverview, setMovieOverview] = useState('');
	const [path, setpath] = useState('');
	const [date, setdate] = useState('');
	const [rating, setRating] = useState('');
	const [movieTitle, setmovieTitle] = useState('');
	const [searchParam, setSearchParam] = useState('');
	const [editingMovie, setEditingMovie] = useState<any | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { data, isLoading, errorMovie, fetchMovies } = useMoviesStore();

	const handleEditClick = (movie: any) => {
		setEditingMovie({ ...movie, movieId: movie._id });
		setIsModalOpen(true);
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	const filteredMovies = (Array.isArray(data) ? data : []).filter((m: any) =>
		m.title?.toLowerCase().includes(searchParam.toLowerCase())
	);

	const moviesPerPage = 10;
	const indexOfLast = currentPage * moviesPerPage;
	const indexOfFirst = indexOfLast - moviesPerPage;
	const paginatedMovies = filteredMovies.slice(indexOfFirst, indexOfLast);

	const handleNextPage = () => {
		setCurrentPage((prev) => prev + 1);
	};

	const handlePrevPage = () => {
		if (currentPage > 1) setCurrentPage((prev) => prev - 1);
	};

	const handleDelete = async (movie: any) => {
		try {
			const response = await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${movie._id}`
			);

			if (response.status === 200) {
				await fetchMovies();
				toast.success(`Movie "${movie.title}" deleted successfully!`);
			} else {
				toast.error(`Failed to delete movie "${movie.title}".`);
			}
		} catch {
			toast.error(`Error deleting movie "${movie.title}"`);
		} finally {
		}
	};

	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		};
		return new Date(dateString).toLocaleDateString('en-US', options);
	};

	return (
		<div className='px-6 py-6'>
			<div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
				<h1 className='text-2xl font-semibold text-gray-800'>Movie List</h1>

				<div className='flex items-center gap-2'>
					<div className='relative'>
						<input
							type='text'
							onChange={(e) => {
								setSearchParam(e.currentTarget.value);
								setCurrentPage(1);
							}}
							placeholder='Search for a movie...'
							className='h-10 w-72 rounded-lg border border-gray-300 pl-10 pr-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all'
						/>

						<button className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-5 h-5'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
								/>
							</svg>
						</button>
					</div>

					<button className='flex items-center gap-2 h-10 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-red-500 active:scale-95 transition-all'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-4 h-4'
						>
							<path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
						</svg>
						Add Movie
					</button>
				</div>
			</div>

			{isLoading && (
				<div className='flex justify-center items-center py-10'>
					<div className='h-10 w-10 animate-spin rounded-full border-4 border-red-500 border-t-transparent'></div>
				</div>
			)}

			{errorMovie && <div className='text-center text-red-600 font-medium py-4'>{errorMovie}</div>}

			{!isLoading && !errorMovie && (
				<div className='overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm'>
					<table className='min-w-full text-left text-sm'>
						<thead className='bg-[#f5f5f8] text-xs font-semibold uppercase tracking-wide text-gray-500'>
							<tr>
								<th className='px-4 py-3'>
									<input type='checkbox' className='h-4 w-4 accent-red-600' />
								</th>
								<th className='px-4 py-3'>Image</th>
								<th className='px-4 py-3'>Title</th>
								<th className='px-4 py-3'>Genre</th>
								<th className='px-4 py-3'>Release date</th>
								<th className='px-4 py-3'>Rating</th>
								<th className='px-4 py-3 text-right'>Action</th>
							</tr>
						</thead>

						<tbody className='divide-y divide-gray-100 text-gray-700'>
							{paginatedMovies.map((movie: any) => (
								<tr className='hover:bg-gray-50' key={movie.tmdbId}>
									<td className='px-4 py-3'>
										<input type='checkbox' className='h-4 w-4 accent-red-600' />
									</td>

									<td className='px-4 py-3'>
										<button
											command='show-modal'
											commandfor='dialogShow'
											className='h-14 w-10 overflow-hidden rounded-md bg-gray-200'
											onClick={() => {
												setMovieOverview(movie.overview);
												setpath(movie.posterPath);
												setmovieTitle(movie.title);
												setdate(formatDate(movie.releaseDate));
												setRating(movie.averageRating?.toFixed(1) || 'N/A');
											}}
										>
											<img src={movie.posterPath} alt={movie.title} />
										</button>
									</td>

									<td className='px-4 py-3 font-medium text-gray-900'>{movie.title}</td>

									<td className='px-4 py-3 text-gray-600 max-w-40 truncate'>
										{movie.genres?.join(', ') || '—'}
									</td>

									<td className='px-4 py-3 text-gray-500'>{formatDate(movie.releaseDate)}</td>

									<td className='px-4 py-3 text-gray-600'>
										{movie.averageRating.toFixed(1) || 'N/A'}
									</td>

									<td className='px-4 py-3 text-right text-xs'>
										<>
											<button
												className='mr-2 rounded-md px-2 py-1 text-gray-700 hover:bg-gray-100'
												onClick={() => handleEditClick(movie)}
											>
												Edit
											</button>

											<button
												className='mr-2 rounded-md px-2 py-1 text-red-600 hover:bg-red-50'
												onClick={() => handleDelete(movie)}
											>
												Delete
											</button>
										</>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			<div className='flex justify-between items-center mt-4'>
				<button
					onClick={handlePrevPage}
					disabled={currentPage === 1}
					className={`rounded-lg px-3 py-2 text-sm font-medium ${
						currentPage === 1
							? 'bg-gray-200 text-gray-400 cursor-not-allowed'
							: 'bg-red-600 text-white hover:bg-red-500'
					}`}
				>
					Previous
				</button>

				<span className='text-gray-700 text-sm'>Page {currentPage}</span>

				<button
					onClick={handleNextPage}
					className='rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500'
				>
					Next
				</button>
			</div>

			{isModalOpen && editingMovie && (
				<EditMovieModal
					movie={editingMovie}
					onClose={() => setIsModalOpen(false)}
					onUpdated={() => {
						fetchMovies();
						setIsModalOpen(false);
					}}
				/>
			)}

			<ShowMoviesModal
				description={movieOverview}
				title={movieTitle}
				imagePath={path}
				date={date}
				rating={rating}
			/>
		</div>
	);
}
