import User from '@/models/User';
import connectionDatabase from './mongoose';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';


export interface JWTPayload {
	id: string;
	name: string;
	iat?: number;
	exp?: number;
}

export interface VerifiedUser {
	id: string;
	name: string;
	email?: string;
	role?: string;
	emailVerified?: boolean;
}



export async function verifyTokenFromCookie(): Promise<VerifiedUser | null> {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get('authToken')?.value;

		if (!token) {
			console.log('No token found in cookie');
			return null;
		}

		// Vérifier le token
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as VerifiedUser;

		return decoded;
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			console.log('Token expired');
		} else if (error instanceof jwt.JsonWebTokenError) {
			console.log('Invalid token');
		} else {
			console.error('Token verification error:', error);
		}
		return null;
	}
}

export function verifyTokenFromRequest(request: NextRequest): VerifiedUser | null {
	try {
		const token = request.cookies.get('authToken')?.value;

		if (!token) {
			return null;
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
		// console.log(decoded)
		return decoded;
	} catch (error) {
    console.log(error)
		return null;
	}
}



export async function getUserFromToken(): Promise<VerifiedUser | null> {
	const tokenData = await verifyTokenFromCookie();

	if (!tokenData) {
		return null;
	}

	try {
		await connectionDatabase();
		const user = await User.findById(tokenData.id).select('-password -refreshToken');

		if (!user) {
			return null;
		}

		console.log(user)

		return {
			id: user._id.toString(),
			name: user.name,
			email: user.email,
			role: user.type,
			emailVerified: user.emailVerified
		};
	} catch (error) {
		console.error('Error fetching user:', error);
		return null;
	}
}
