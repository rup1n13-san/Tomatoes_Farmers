/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { create } from 'zustand';
import { useAuthStore } from "@/lib/useAuthStore";

interface CommentStore {
  dataComment: any[];
  isLoading: boolean;
  error: string | null;
  fetchComment: (movieId: string) => void;
  addComment: (movieId: string, content: string, author: string, parentComment?: string) => void;
  deleteComment: (id: string) => void;
  editComment: (id: string, content: string) => void;
}

const useCommentStore = create<CommentStore>((set, get) => {
  const { user } = useAuthStore.getState();

  return {
    dataComment: [],
    isLoading: false,
    error: null,

    fetchComment: async (movieId) => {
      set({ isLoading: true, error: null });
      try {
        const res = await axios.get(`/api/${movieId}/comments`);
        set({ dataComment: res.data, isLoading: false });
      } catch (err: any) {
        set({ error: err.response?.data?.message || 'Something went wrong', isLoading: false });
      }
    },

    addComment: async (movieId: string, content: string, author: string, parentComment?: string) => {
      set({ isLoading: true, error: null });
      try {
        const res = await axios.post(`/api/${movieId}/comments`, { content, author, parentComment });
        set((state) => ({
          dataComment: [res.data, ...state.dataComment],
          isLoading: false,
        }));
      } catch (err: any) {
        set({ error: err.response?.data?.message || "Something went wrong", isLoading: false });
      }
    },

    deleteComment: async (id: string) => {
      const comment = get().dataComment.find(c => c._id === id);
      if (!comment) return;

      if (comment.author._id !== user?.id) {
        alert("You are not allowed to delete this comment!");
        return;
      }

      try {
        await axios.delete(`/api/comments/${id}`);
        set((state) => ({
          dataComment: state.dataComment.filter((c) => c._id !== id),
        }));
      } catch (err) {
        console.error(err);
      }
    },

    editComment: async (id: string, content: string) => {
      const comment = get().dataComment.find(c => c._id === id);
      if (!comment) return;

      if (comment.author._id !== user?.id) {
        alert("You are not allowed to edit this comment!");
        return;
      }

      try {
        const res = await axios.put(`/api/comments/${id}`, { content });
        set((state) => ({
          dataComment: state.dataComment.map((c) => (c._id === id ? res.data : c)),
        }));
      } catch (err) {
        console.error(err);
      }
    },
  };
});

export default useCommentStore;
