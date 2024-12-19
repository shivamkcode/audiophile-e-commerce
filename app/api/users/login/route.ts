import { User } from "@/models/index";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface LoginType {
    email: string;
    password: string;
  }
  
  export async function POST(req: Request) {
      const body = await req.json();
      const { email, password }: LoginType = body;
      const existingUser = await User.findOne({ where: { email } });
  
      if (!existingUser) {
        return NextResponse.json({ error: "User does not exist" }, { status: 400 });
      } else {
        const isPasswordMatch = await bcrypt.compare(password, existingUser.dataValues.password);
        if (!isPasswordMatch) {
          return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        } else {
          const token = jwt.sign({ user: existingUser }, "secretKey", {});
  
          return NextResponse.json({ data: token }, { status: 200 });
        }
      }
  }
  