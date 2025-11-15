import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST() {

    try {
        const cookieStore = await cookies()
        console.log(cookieStore.get('authToken'))
        cookieStore.delete('authToken')
        console.log('cookie deleted')
        return NextResponse.json("Logout successful", { status: 200 });

    } catch (err) {
        console.log(err);
        return NextResponse.json("Sometings went wrong", { status: 500 });

    }


}
