import { User } from "@/models/index";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

interface LoginType {
  email: string;
  password: string;
}

interface UserJwtPayload extends JwtPayload {
  user: {
    id: number;
    email: string; // Add any other properties your user object might have
  };
}

const getUserFromToken = async (token: string) => {
  try {
    const { user } = jwt.verify(token, "secretKey") as UserJwtPayload ;
    const existingUser = await User.findOne({ where: { id: user.id } });
    if (!existingUser) {
      throw new Error("User does not exist");
    }
    return existingUser;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export async function GET(req: Request) {
  try {
    const token = req.headers.get("authorization");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await getUserFromToken(token);
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password }: LoginType = body;
  const existingUser = await User.findOne({ where: { email } });

  if (!existingUser) {
    return NextResponse.json({ error: "User does not exist" }, { status: 400 });
  } else {
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.dataValues.password
    );
    if (!isPasswordMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    } else {
      const token = jwt.sign({ user: existingUser }, "secretKey", {});

      return NextResponse.json({ data: token }, { status: 200 });
    }
  }
}
