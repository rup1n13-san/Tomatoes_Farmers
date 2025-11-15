import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import connectionDatabase from "../../../../../lib/mongoose";
import bcrypt from 'bcrypt'
import { sendEmail, sendEmailAlertNewUser } from "@/helpers/mailer";
export async function POST(request: Request) {
  try {
    await connectionDatabase();
    const { name, email, password,passwordConfirm } = await request.json();
    if(password!=passwordConfirm){
    return NextResponse.json('The two password not match', { status: 400 });

    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new User({ name:name, email:email, password:hashedPassword });
    const savedUser=await newUser.save();

    await sendEmail(email,savedUser.name,savedUser._id)
    await sendEmailAlertNewUser(email,savedUser.name)
    
    return NextResponse.json("User created", { status: 201 })
  } catch (err) {
    console.log(err);
    return NextResponse.json('Sometings went wrong', { status: 500 });
  }
}
