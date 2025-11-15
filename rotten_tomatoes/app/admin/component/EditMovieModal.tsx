/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Movie {
	movieId: string;
	title: string;
	overview: string;
	releaseDate: string;
}

interface EditMovieModalProps {
	movie: Movie;
	onClose: () => void;
	onUpdated?: () => void;
}

export default function EditMovieModal({ movie, onClose, onUpdated }: EditMovieModalProps) {
	const [formData, setFormData] = useState({
		title: movie.title || '',
		overview: movie.overview || '',
		releaseDate: movie.releaseDate || ''
	});
	const [isSaving, setIsSaving] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async () => {
		try {
			setIsSaving(true);
			await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${movie.movieId}`, formData);
			toast.success('Movie updated successfully!');
			if (onUpdated) onUpdated();
		} catch (err) {
			console.error(err);
			toast.error('Failed to update movie.');
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-50 backdrop-blur-sm'>
			<div className='bg-white rounded-xl shadow-lg w-[420px] p-6'>
				<h2 className='text-lg font-semibold mb-4 text-gray-800'>Edit Movie</h2>

				<div className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
						<input
							type='text'
							name='title'
							value={formData.title}
							onChange={handleChange}
							className='w-full border rounded-lg px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>Overview</label>
						<textarea
							name='overview'
							value={formData.overview}
							onChange={handleChange}
							rows={3}
							className='w-full border rounded-lg px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all resize-none'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>Release Date</label>
						<input
							type='date'
							name='releaseDate'
							value={formData.releaseDate}
							onChange={handleChange}
							className='w-full border rounded-lg px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all'
						/>
					</div>
				</div>

				<div className='flex justify-end mt-6 gap-2'>
					<button
						onClick={onClose}
						className='px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 transition-all'
					>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						disabled={isSaving}
						className={`px-4 py-2 text-sm rounded-lg text-white transition-all ${
							isSaving
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-red-600 hover:bg-red-500 active:scale-95'
						}`}
					>
						{isSaving ? 'Saving...' : 'Save'}
					</button>
				</div>
			</div>
		</div>
	);
}
