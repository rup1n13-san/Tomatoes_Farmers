import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import connectionDatabase from "../../../../../lib/mongoose";
import { sendEmailAlertDeleteUser, sendEmailAlertForDeleteUser } from "@/helpers/mailer";

export async function DELETE(request: Request) {
    const { id } = await request.json();
    let user = null
    await connectionDatabase();

    try {
        const userobj= await User.findById(id)
        const email= userobj.email
        user = await User.deleteOne({ _id: id });
       await sendEmailAlertDeleteUser(id)
       await sendEmailAlertForDeleteUser(email)
        if (user == null) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json("User deleted", { status: 200 });
    } catch (err) {
        console.log(err);

    }
}