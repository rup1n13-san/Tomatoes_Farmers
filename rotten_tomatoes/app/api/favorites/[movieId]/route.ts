import connectionDatabase from '@/lib/mongoose';
import Favorite from '@/models/Favorite';
import { NextResponse } from 'next/server';

function getUserIdFromRequest() {
	return null;
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ movieId: string }> }) {
	await connectionDatabase();
	const { movieId } = await params;
	const userId = getUserIdFromRequest();

	if (!userId) {
		return NextResponse.json({ error: 'auth required' }, { status: 401 });
	}

	await Favorite.deleteOne({ user: userId, movie: movieId });
	return NextResponse.json({ ok: true });
}
