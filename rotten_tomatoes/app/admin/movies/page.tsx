/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import EditMovieModal from '../component/EditMovieModal';
import ShowMoviesModal from '../component/Mshow';

export default function MoviesPage() {
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [isSaving, setIsSaving] = useState<number | null>(null);
	const [movieOverview, setMovieOverview] = useState('');
	const [path, setpath] = useState('');
	const [date, setdate] = useState('');
	const [rating, setRating] = useState('');
	const [movieTitle, setmovieTitle] = useState('');
	const [searchParam, setSearchParam] = useState<string | null>('');
	const [editingMovie, setEditingMovie] = useState<any | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleEditClick = (movie: any) => {
		setEditingMovie(movie);
		setIsModalOpen(true);
	};

	const fetchMovies = async (query: string | null = null) => {
		try {
			setIsLoading(true);
			setError(null);
			let response;
			if (query != null && query.trim().length > 0) {
				response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/api/tmdb-movies?page=${currentPage}&query=${query}`
				);
			} else {
				response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/api/tmdb-movies?page=${currentPage}`
				);
			}

			setMovies(response.data.movies || []);
		} catch (err) {
			console.error(err);
			setError('Failed to load movies. Please try again later.');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchMovies(searchParam);
	}, [currentPage]);

	const handleNextPage = () => {
		setCurrentPage((prev) => prev + 1);
	};

	const handlePrevPage = () => {
		if (currentPage > 1) setCurrentPage((prev) => prev - 1);
	};

	const handleAddMovie = async (movie: any) => {
		try {
			setIsSaving(movie.tmdbId);

			const payload = {
				tmdbId: movie.tmdbId,
				title: movie.title,
				overview: movie.overview,
				releaseDate: movie.releaseDate,
				posterPath: movie.posterPath,
				backdropPath: movie.backdropPath,
				genres: movie.genres,
				director: movie.director || '',
				originalLanguage: movie.originalLanguage,
				videoLink: movie.videoLink || ''
			};

			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`, payload);

			if (response.status === 201) {
				toast.success(`Movie ${movie.title} added successfully!`);
				await refreshMovies();
			} else {
				toast.error(`Failed to add movie "${movie.title}".`);
			}
		} catch (err) {
			console.error(err);
			toast.error(`Error saving movie "${movie.title}"`);
		} finally {
			setIsSaving(null);
		}
	};

	const handleDelete = async (movie: any) => {
		try {
			setIsSaving(movie.tmdbId);

			const response = await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${movie.movieId}`
			);

			if (response.status === 200) {
				setMovies((prevMovies) => prevMovies.filter((m: any) => m.movieId !== movie.movieId));

				toast.success(`Movie "${movie.title}" deleted successfully!`);
			} else {
				toast.error(`Failed to delete movie "${movie.title}".`);
			}
		} catch (err) {
			console.error(err);
			toast.error(`Error deleting movie "${movie.title}"`);
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

	const refreshMovies = async () => {
		await fetchMovies(searchParam);
	};

	return (
		<div className='px-6 py-6'>
			<div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
				<h1 className='text-2xl font-semibold text-gray-800'>Movie List</h1>

				<div className='flex items-center gap-2'>
					<div className='relative'>
						<input
							type='text'
							onChange={(e) => setSearchParam(e.currentTarget.value)}
							placeholder='Search for a movie...'
							className='h-10 w-72 rounded-lg border border-gray-300 pl-10 pr-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all'
						/>
						<button
							onClick={() => {
								setCurrentPage(1);
								fetchMovies(searchParam);
							}}
							className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors'
						>
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

			{/* Loading Spinner */}
			{isLoading && (
				<div className='flex justify-center items-center py-10'>
					<div className='h-10 w-10 animate-spin rounded-full border-4 border-red-500 border-t-transparent'></div>
				</div>
			)}

			{/* Error Message */}
			{error && <div className='text-center text-red-600 font-medium py-4'>{error}</div>}

			{!isLoading && !error && (
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
								<th className='px-4 py-3'>Status</th>
								<th className='px-4 py-3 text-right'>Action</th>
							</tr>
						</thead>

						<tbody className='divide-y divide-gray-100 text-gray-700'>
							{movies?.map((movie: any) => {
								return (
									// onClick={() => {handleShow(movie.overview)}}

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
													setRating(movie.averageRating.toFixed(1) || 'N/A');
												}}
												// onMouseLeave={() => setIsShown(false)}
											>
												<img src={movie.posterPath} alt={movie.title} />
											</button>
										</td>
										<td className='px-4 py-3 font-medium text-gray-900'>{movie.title}</td>
										<td
											className='px-4 py-3 text-gray-600 max-w-40 truncate'
											title={movie.genres?.join(', ')}
										>
											{movie.genres?.join(', ') || '—'}
										</td>
										<td className='px-4 py-3 text-gray-500'>{formatDate(movie.releaseDate)}</td>
										<td className='px-4 py-3 text-gray-600'>
											{movie.averageRating.toFixed(1) || 'N/A'}
										</td>
										<td className='px-4 py-3'>
											{movie.status === 'saved' ? (
												<span className='text-green-600 text-xs font-medium'>Saved</span>
											) : (
												<span className='text-gray-400 text-xs font-medium'>New</span>
											)}
										</td>
										<td className='px-4 py-3 text-right text-xs'>
											{movie.status === 'saved' && (
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
											)}

											{/*Only display add button if the movie status is new */}
											{movie.status === 'new' && (
												<button
													onClick={() => handleAddMovie(movie)}
													disabled={isSaving === movie.tmdbId}
													className={`rounded-md px-2 py-1 text-white ${
														isSaving === movie.tmdbId
															? 'bg-gray-400 cursor-not-allowed'
															: 'bg-green-600 hover:bg-green-500'
													}`}
												>
													{isSaving === movie.tmdbId ? 'Saving...' : 'Add'}
												</button>
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}

			{/* Pagination */}
			<div className='flex justify-between items-center mt-4'>
				<button
					onClick={handlePrevPage}
					disabled={currentPage === 1}
					className={`rounded-lg px-3 py-2 text-sm font-medium cursor-pointer ${
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
					className='rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500 cursor-pointer'
				>
					Next
				</button>
			</div>

			{/**Edit modal */}
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
