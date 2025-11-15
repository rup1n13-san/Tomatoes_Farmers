import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import connectionDatabase from "../../../../../lib/mongoose";
import { resetEmail } from "@/helpers/mailer";
export async function POST(request: Request) {
    try {
        await connectionDatabase();
        const { email } = await request.json();
        const user = await User.findOne({ email });
        if (user == null) {
            return NextResponse.json({ error: 'Email not exist on our record' }, { status: 401 });
        }

        await resetEmail(email)

        return NextResponse.json("Email sended", { status: 201 })
    } catch (err) {
        console.log(err);
        return NextResponse.json('Sometings went wrong', { status: 500 });
    }
}
