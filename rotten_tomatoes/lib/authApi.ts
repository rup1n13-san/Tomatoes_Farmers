/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

api.interceptors.request.use((config) => {
	const token = useAuthStore.getState().token;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export async function loginUser(email: string, password: string) {
	try {
		const { data } = await api.post('/api/users/account/login', { email, password });
		toast.success('Logged in successfully!');
		return data;
	} catch (error: any) {
		const msg = error.response?.data?.error || 'Login failed';
		toast.error(msg);
		throw new Error(msg);
	}
}

export async function registerUser(
	name: string,
	email: string,
	password: string,
	passwordConfirm: string
) {
	try {
		const { data } = await api.post('/api/users/account/register', {
			name,
			email,
			password,
			passwordConfirm
		});
		toast.success('Account created successfully!');
		return data;
	} catch (error: any) {
		const msg = error.response?.data?.error || 'Registration failed';
		toast.error(msg);
		throw new Error(msg);
	}
}

export async function sendEmailReset(email: string) {
	try {
		const { data } = await api.post(
			`${process.env.NEXT_PUBLIC_API_URL}/api/users/account/reset-password/`,
			{ email }
		);
		toast.success('Reset email sended!');
		return data;
	} catch (error: any) {
		const msg = error.response?.data?.error || 'Reseted failed';
		toast.error(msg);
		throw new Error(msg);
	}
}

export async function passwordReset(
	password: string,
	confirmPassword: string,
	id: any,
	token: any
) {
	try {
		const { data } = await api.put(
			`${process.env.NEXT_PUBLIC_API_URL}/api/users/account/reset-password/${id}/${token}`,
			{ password, confirmPassword }
		);
		toast.success('Password updated');
		return data;
	} catch (error: any) {
		const msg = error.response?.data?.error || 'Reseted failed';
		toast.error(msg);
		throw new Error(msg);
	}
}

export async function logoutUser() {
	try {
		await api.post('/api/users/account/logout');
		toast.success('Logged out successfully!');
	} catch (error: any) {
		const msg = error.response?.data?.error || 'Logout failed';
		toast.error(msg);
		throw new Error(msg);
	}
}

export { api };
