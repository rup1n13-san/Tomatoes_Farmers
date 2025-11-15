import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import connectionDatabase from '../../../../../lib/mongoose';
import User from '../../../../../models/User';

export async function POST(request: Request) {
	await connectionDatabase();
	const { email, password } = await request.json();
	let user = null;
	try {
		user = await User.findOne({ email });
		if (user == null) {
			return NextResponse.json({ error: 'Incorrect mail or password' }, { status: 401 });
		}
		const passwordValid = await bcrypt.compare(password, user.password);

		if (passwordValid) {
			const token = jwt.sign(
				{ id: user.id, name: user.name, role: user.type,email: user.email, emailVerified: user.emailVerified }, // The payload contains userid and username
				process.env.JWT_SECRET!,
				{ expiresIn: process.env.JWT_EXPIRES_IN }
			);


			// response.cookies.set('authToken', token, {
			//     httpOnly: true,
			//     secure: process.env.NODE_ENV === 'production', // HTTPS in  production environment
			//     maxAge: Number(process.env.JWT_EXPIRES_IN),
			//     sameSite: 'lax', // CSRF attacks
			//     path: '/'
			// });
			const cookieStore = await cookies();
			cookieStore.set({
				name: 'authToken',
				value: token,
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production', // HTTPS in  production environment
				maxAge: Number(process.env.JWT_EXPIRES_IN),
				sameSite: 'lax', // CSRF attacks
				path: '/'
			});
			return NextResponse.json(
				{
					token,
					user: {
						id: user.id,
						name: user.name,
						email: user.email,
						role: user.type,
						emailVerified: user.emailVerified
					}
				},
				{ status: 200 }
			);
		}
		return NextResponse.json('incorrect email or password', { status: 401 });
	} catch (err) {
		console.log(err);
	}
}
