import { NextResponse } from "next/server";
import User from "../../../../../models/User";

import bcrypt from 'bcrypt'


export async function PUT(request: Request) {
    // let user = null
    const { id, name, email, old_password, new_password,type, status } = await request.json();
    console.log(id, name, email, old_password, new_password,type,status)
    try {
        const updatedUser = await User.findById(id).exec();

        if (updatedUser) {
            if (email && email !== updatedUser.email) {
                updatedUser.email = email;
            }

            if (name && name != updatedUser.name) {
                updatedUser.name = name;
            }
             if (type && type != updatedUser.type) {
                updatedUser.type = type;
            }
            if (status && status != updatedUser.emailVerified) {
                updatedUser.emailVerified = status;
            }

            if (old_password) {
                const oldPasswordValid = await bcrypt.compare(
                    old_password,
                    updatedUser.password,
                );
                if (oldPasswordValid) {
                    updatedUser.password = new_password;
                }
            }
        } else {
            return NextResponse.json("User not found", { status: 404 });
        }

        const savedUser = await updatedUser.save();
        return NextResponse.json(savedUser, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json("Something going wrong", { status: 500 });


    }
}
