/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { create } from "zustand";

interface Movie {
	_id: string;
	tmdbId: number;
	title: string;
	overview: string;
	releaseDate: string;
	posterPath: string;
	backdropPath: string;
	genres: string[];
	director: string;
	originalLanguage: string;
	averageRating: number;
	totalRatings: number;
	createdAt: string;
	updatedAt: string;
	status?: string;
	videoLink?: string;
}

interface MoviesStore {
  data: Movie[] | null;
  oneMovie: Movie | null;
  isLoading: boolean;
  errorMovie: string | null;

  fetchMovies: () => Promise<void>;
  fetchOneMovie: (movieId: string) => Promise<void>;
}

const useMoviesStore = create<MoviesStore>((set) => ({
  data: [],
  oneMovie: null,
  isLoading: false,
  errorMovie: null,


  fetchMovies: async () => {
    set({ isLoading: true, errorMovie: null });
    try {
      const response = await axios.get("/api/movies");
      set({ data: response.data, isLoading: false });
    } catch (error: any) {
      set({
        errorMovie: error.response?.data?.message || "Failed to fetch movies",
        isLoading: false,
      });
    }
  },


  fetchOneMovie: async (movieId: string) => {
    set({ isLoading: true, errorMovie: null });
    try {
      const response = await axios.get(`/api/movies/${movieId}`);
      set({ oneMovie: response.data, isLoading: false });
    } catch (error: any) {
      set({
        errorMovie: error.response?.data?.message || "Failed to fetch movie",
        isLoading: false,
      });
    }
  },
}));

export default useMoviesStore;
