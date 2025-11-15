import connectionDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from 'bcrypt'
import { generateToken } from "@/models/User";
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string, token: string }> }
) {
    try {
        await connectionDatabase();
        const { id, token } = await params;

        const user = await User.findById(id)
        // console.log("id:",id,"\n \n Token:", token)
        // const userToken = user.refreshToken
        if (!user || user.refreshToken != token) {
            return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        }
        const { password, confirmPassword } = await request.json();
        if (!password || !confirmPassword) {
            return NextResponse.json({ error: "Confirm the password entered" }, { status: 400 });
        }
        if (password!=confirmPassword) {
            return NextResponse.json({ error: "The two passwords not match" }, { status: 400 });
        }
        bcrypt.hash(password,10)
        generateToken()
        
        user.password=await bcrypt.hash(password,10)
        user.refreshToken=generateToken()
        await user.save()
        // const saveUser= await User.findByIdAndUpdate(id, {password:newPass,refreshToken:newToken}).exec();
        
        return NextResponse.json("Password updated", { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Error while updating password" }, { status: 500 });
    }
}