import { Cart } from "@/models/index";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { Model } from "sequelize";

export interface CartType {
  productId: number | undefined;
  count: number;
  price: number | undefined;
}
interface CartModel extends Model {
  quantity: number;
}

export async function GET(req: Request) {
  try {
    const token = req.headers.get("authorization");
    if (token) {
      const { user } = jwt.verify(token, "secretKey") as JwtPayload;
      const carts = await Cart.findAll({ where: { userId: user.id } });

      return NextResponse.json({ data: carts }, { status: 200 });
    } else {
      NextResponse.json({ error: "Failed to get cart" }, { status: 500 });
    }
  } catch (error) {
    NextResponse.json({ error: "Failed to get cart" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, products }: { token: string; products: CartType[] } = body;
    const { user } = jwt.verify(token, "secretKey") as JwtPayload;

    for (const product of products) {
      const { productId, count, price } = product;

      const existingCart = (await Cart.findOne({
        where: { productId: productId, userId: user.id },
      })) as CartModel;

      if (!existingCart) {
        await Cart.create({
          userId: user.id,
          productId,
          quantity: count,
          price,
        });
      } else {
        existingCart.quantity = count;
        await existingCart.save();
      }
    }
    return NextResponse.json(
      { message: "Cart Updated Successfully" },
      { status: 200 }
    );
  } catch (error) {
    NextResponse.json({ error: "failed to add to cart!" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const token = req.headers.get("authorization");
    if (token) {
      const { user } = jwt.verify(token, "secretKey") as JwtPayload;
      await Cart.destroy({ where: { userId: user.id } });
      return NextResponse.json(
        { message: "Cart deleted successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete carts" },
      { status: 500 }
    );
  }
}
