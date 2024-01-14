import { User, Cart } from "@/models/index";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface UserType {
  username: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { username, email, password }: UserType = body;

  const existingUser =
    (await User.findOne({ where: { email } })) ||
    (await User.findOne({ where: { username } }));

  if (existingUser) {
    return NextResponse.json(
      { error: "Email or username already exists" },
      { status: 201 }
    );
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      const token = jwt.sign({ user }, "secretKey", {});

      return NextResponse.json({ data: token }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
