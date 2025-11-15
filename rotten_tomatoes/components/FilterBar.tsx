'use client';

import useMoviesStore from '@/lib/MoviesStore';
import { useFilterStore } from '@/lib/useFilterStore';
import { useMemo } from 'react';

export default function FilterBar() {
	const { data } = useMoviesStore();

	const {
		searchQuery,
		selectedGenre,
		selectedYear,
		selectedLanguage,
		sortBy,
		setSearchQuery,
		setSelectedGenre,
		setSelectedYear,
		setSelectedLanguage,
		setSortBy,
		resetFilters
	} = useFilterStore();

	//get all avalable genre in movies
	const availableGenres = useMemo(() => {
		if (!data) return [];

		const genresSet = new Set<string>();
		data.forEach((movie) => {
			movie.genres.forEach((genre) => genresSet.add(genre));
		});

		return Array.from(genresSet).sort();
	}, [data]);

	//get all avalable yearin movies
	const availableYears = useMemo(() => {
		if (!data) return [];

		const yearsSet = new Set<string>();
		data.forEach((movie) => {
			if (movie.releaseDate) {
				const year = new Date(movie.releaseDate).getFullYear().toString();
				yearsSet.add(year);
			}
		});

		return Array.from(yearsSet).sort((a, b) => parseInt(b) - parseInt(a));
	}, [data]);

  //get all available languages
  const availableLanguages = useMemo(() => {
		if (!data) return [];

		const languagesSet = new Set<string>();
		data.forEach((movie) => {
			if (movie.originalLanguage) {
				languagesSet.add(movie.originalLanguage);
			}
		});

		return Array.from(languagesSet).sort();
	}, [data]);

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		resetFilters();
	};

	return (
		<div className='rounded-2xl border border-neutral-800  p-3 backdrop-blur'>
			<form className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
				<input
					type='text'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder='Search…'
					className='col-span-2 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 outline-none sm:col-span-1'
				/>

				<select
					value={selectedGenre}
					onChange={(e) => setSelectedGenre(e.target.value)}
					className='rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none'
				>
					<option value='all'>All genres</option>
					{availableGenres.map((genre) => (
						<option key={genre} value={genre}>
							{genre}
						</option>
					))}
				</select>

				<select
					value={selectedYear}
					onChange={(e) => setSelectedYear(e.target.value)}
					className='rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none'
				>
					<option value='all'> All years </option>
					{availableYears.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>

				<select
					value={selectedLanguage}
					onChange={(e) => setSelectedLanguage(e.target.value)}
					className='rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none'
				>
					<option value='all'>All languages</option>
					{availableLanguages.map((lang) => (
						<option key={lang} value={lang}>
							{lang.toUpperCase()}
						</option>
					))}
				</select>

				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
					className='rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none'
				>
					<option value='popularity'>Popularity</option>
					<option value='rating'>Rating (High to Low)</option>
					<option value='rating-low'>Rating (Low to High)</option>
					<option value='release-date'>Release Date (Newest)</option>
					<option value='release-date-old'>Release Date (Oldest)</option>
					<option value='title-az'>Title (A-Z)</option>
					<option value='title-za'>Title (Z-A)</option>
				</select>

				<div className='mt-4 flex justify-end'>
					<button
						onClick={handleReset}
						className='px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition'
					>
						Reset
					</button>
				</div>

				{/* <div className='mt-2 text-sm text-gray-400 text-center'>
					{availableGenres.length} genres • {availableYears.length} years •{' '}
					{availableLanguages.length} languages
				</div> */}
			</form>
		</div>
	);
}
