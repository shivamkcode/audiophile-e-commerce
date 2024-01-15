"use client";
import React, { useState } from "react";
import Button from "./Button";
import { CartData } from "@/components/Cart";
import { CartType } from '@/app/api/cart/route'

interface Props {
  productId: number | undefined;
  price: number | undefined;
  button: boolean;
  cart: CartData | null;
}

const Quantity: React.FC<Props> = ({ productId, price, button, cart }) => {
  const [count, setCount] = useState(cart ? cart.quantity : 1);

  const addToCart = async ( products: CartType[] ) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, products }),
      });
      if (response.ok) {
        console.log("Item added successfully!");
        console.log(count);
        setCount(1)
      } else{
        console.log('Failed to add product')
      }
    } catch (error) {
      console.log("Error adding item", error);
    }
  };

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      addToCart([{productId: productId, count: count, price: price}]);
    }
  };

  return (
    <div className="flex h-11 gap-4">
      <div className="bg-[#F1F1F1] flex gap-6 p-3 w-auto text-sm">
        <span
          className="opacity-25 cursor-pointer  hover:bg-slate-400"
          onClick={() => count > 1 ? setCount(count - 1) : false}
        >
          -
        </span>
        <span className="font-bold">{count}</span>
        <span
          className="opacity-25 cursor-pointer hover:bg-slate-400"
          onClick={() => setCount(count + 1)}
        >
          +
        </span>
      </div>
      <Button
        disabled={false}
        onClick={() => {
          handleClick();
        }}
        color="o"
      >
        Add to cart
      </Button>
    </div>
  );
};

export default Quantity;
