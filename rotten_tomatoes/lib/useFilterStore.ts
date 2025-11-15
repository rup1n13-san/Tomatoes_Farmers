import { create } from 'zustand';

interface FilterState {
	searchQuery: string;
	selectedGenre: string;
	selectedYear: string;
	selectedLanguage: string; 
	sortBy: string; 
	minRating: number;

	setSearchQuery: (query: string) => void;
	setSelectedGenre: (genre: string) => void;
	setSelectedYear: (year: string) => void;
	setSelectedLanguage: (language: string) => void; 
	setSortBy: (sort: string) => void; 
	setMinRating: (rating: number) => void;
	resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
	searchQuery: '',
	selectedGenre: 'all',
	selectedYear: 'all',
	selectedLanguage: 'all', 
	sortBy: 'popularity',
	minRating: 0,

	setSearchQuery: (query) => set({ searchQuery: query }),
	setSelectedGenre: (genre) => set({ selectedGenre: genre }),
	setSelectedYear: (year) => set({ selectedYear: year }),
	setSelectedLanguage: (language) => set({ selectedLanguage: language }), 
	setSortBy: (sort) => set({ sortBy: sort }), 
	setMinRating: (rating) => set({ minRating: rating }),

	resetFilters: () =>
		set({
			searchQuery: '',
			selectedGenre: 'all',
			selectedYear: 'all',
			selectedLanguage: 'all', 
			sortBy: 'popularity', 
			minRating: 0
		})
}));
