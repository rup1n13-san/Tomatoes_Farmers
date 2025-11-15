import { create } from "zustand";
import { useAuthStore } from "../useAuthStore";

type FavoriteMovie = {
  _id: string; 
  movie: {
    _id: string;
    title: string;
    posterPath: string;
  };
  createdAt: string;
};
	

type FavoritesState = {
  userId: string | null;
  favorites: FavoriteMovie[];
  loading: boolean;
  setUserId: (id: string) => void;
  fetchFavorites: () => Promise<void>;
  isFavorite: (movieId: string) => boolean;
  toggleFavorite: (movieId: string) => Promise<void>;
};


const useFavoritesStore = create<FavoritesState>((set, get) => ({
    
  userId: null, 
  favorites: [],
  loading: false,

  setUserId: (id) => set({ userId: id }),

  fetchFavorites: async () => {
    const { user } = useAuthStore.getState();
    const userId = user?.id; 
    console.log("fetchFavorites -> userId:",userId)
    if (!userId) return;

    set({ loading: true });
    try {
      const res = await fetch(
        `/api/favorites?userId=${encodeURIComponent(userId)}`
      );
      if (!res.ok) {
        console.error("Error fetch favorites", await res.json());
        return;
      }
      const data = await res.json();
      set({ favorites: data });
    } catch (e) {
      console.error(e);
    } finally {
      set({ loading: false });
    }
  },

  isFavorite: (movieId) => {
    const { favorites } = get();
    return favorites.some((fav) => fav.movie?._id === movieId);
  },

  toggleFavorite: async (movieId: string) => {
    const { userId, fetchFavorites } = get();

    if (!userId) {
      alert("Vous devez être connecté pour ajouter des favoris.");
      return;
    }

    try {
      const res = await fetch("/api/favorites", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          movieId,
        }),
      });

      if (!res.ok) {
        console.error("Error toggle favorite", await res.json());
        return;
      }

      await fetchFavorites();
    } catch (e) {
      console.error(e);
    }
  },
}));

export default useFavoritesStore;
