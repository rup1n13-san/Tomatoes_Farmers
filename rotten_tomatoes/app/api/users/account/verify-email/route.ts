import { NextResponse } from 'next/server';
import connectionDatabase from '../../../../../lib/mongoose';
import User from '../../../../../models/User';

export async function GET(request: Request) {
	await connectionDatabase();
	const id = request.nextUrl.searchParams.get('id');

	if (!id) {
		return NextResponse.redirect(new URL('/account-verified?status=error', request.url));
	}

	try {
		const theUser = await User.findById(id);

		if (!theUser) {
			return NextResponse.redirect(new URL('/account-verified?status=error', request.url));
		}

		await User.findByIdAndUpdate(id, { emailVerified: true });

		
		return NextResponse.redirect(new URL('/account-verified?status=success', request.url));
	} catch (error) {
		console.log(error);
		return NextResponse.redirect(new URL('/account-verified?status=error', request.url));
	}
}