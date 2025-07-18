import { connectionDB } from "@/lib/mongoose";
import { User } from "@/Models/User";
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server";


export async function POST(request) {
    await connectionDB();

    const {username, password} = await request.json();

    const user = await User.findOne({username});

    const isValid = await bcrypt.compare(password,user.password);

    if(!user || !isValid){
        return NextResponse.json({message:"Wrong password or username !"})
    }

    const response = NextResponse.json({success:true,message:"Login Successfull !",role:user.role})

    response.cookies.set('user-role', user.role, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
  });

  return response;
}

