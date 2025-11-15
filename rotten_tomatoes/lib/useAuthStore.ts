/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from './authApi';

type User = {
	id: string;
	name: string;
	email: string;
	role?: string;
	emailVerified?: boolean;
};

type AuthState = {
	user: User | null;
	token: string | null;
	setUser: (user: User, token: string) => void;
	logout: () => void;
	reloadUser: () => void;
	isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			token: null,

			setUser: (user, token) => {
				set({ user, token });
			},

			logout: () => {
				set({ user: null, token: null });
			},

			reloadUser: async () => {
				const state = get();

				if (!state.user || !state.user.id) {
					console.log('No user ID, skipping reload');
					return;
				}

				try {
					// console.log(`Reloading user: ${state.user.id}`);

					const { data } = await api.get(`/api/users/${state.user.id}`);

					const updatedUser: User = {
						id: data._id,
						name: data.name,
						email: data.email,
						role: data.type,
						emailVerified: data.emailVerified
					};

					set({ user: updatedUser });
					// console.log('User reloaded:', updatedUser);
				} catch (error: any) {
					console.error('Error reloading user:', error);

					if (error.response?.status === 401 || error.response?.status === 404) {
						console.log('Token invalide, logout');
						set({ user: null, token: null });
					}
				}
			},

			isAuthenticated: () => {
				const state = get();
				return !!state.user && !!state.token;
			}
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({
				user: state.user,
				token: state.token
			})
		}
	)
);
