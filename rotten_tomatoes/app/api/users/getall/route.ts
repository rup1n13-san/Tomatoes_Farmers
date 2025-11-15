import { NextResponse } from "next/server";
import User from "@/models/User";
import connectionDatabase from "@/lib/mongoose";

export async function GET() {
    let users = null
    await connectionDatabase();
    try {
        users = await User.find().exec();
        let allUsers=users.map((user) => ({ id: user.id,
             name: user.name,
             email: user.email,
             type: user.type,
             createdAt: user.createdAt,
             updatedAt: user.updatedAt,
             emailVerified:user.emailVerified
            
            }
        ))
        allUsers=allUsers.reverse()
        

        return NextResponse.json(allUsers, { status: 200 });
    } catch (err) {
        console.log(err);

    }
}
