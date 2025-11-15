import User from "@/models/User";
import connectionDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectionDatabase();

		const { id } = await params;

		const user = await User.findById(id);

		if (!user) {
			return NextResponse.json({ error: 'user not found' }, { status: 404 });
		}

		return NextResponse.json(user, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
	}
}
