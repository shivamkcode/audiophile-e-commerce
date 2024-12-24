"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { CartType } from "@/app/api/cart/route";
import { useAlert } from "@/app/alertContext";
import Trash from "../public/assets/cart/trash.png";
import Image from "next/image";

interface Props {
  productId: number | undefined;
  price: number | undefined;
  button: boolean;
}

const getQuantity = async (id: number | undefined) => {
  const token = await localStorage.getItem("token");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/cart`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      }
    );
    if (response.ok) {
      const carts = await response.json();
      const cartItem = carts.data.find(
        (item: { productId: number }) => item.productId === id
      );
      return cartItem.quantity;
    }
  } catch (error) {
    return
  }
};

const Quantity: React.FC<Props> = ({ productId, price }) => {
  const [count, setCount] = useState<number>(1);
  const [text, setText] = useState("Add to cart");
  const { setAlert } = useAlert();

  useEffect(() => {
    const fetchQuantity = async () => {
      const initialQuantity = await getQuantity(productId);
      if (initialQuantity) {
        setCount(initialQuantity);
        setText(initialQuantity ? "Update cart" : "Add to cart");
      }
    };
    fetchQuantity();
  }, [productId]);

  const addToCart = async (products: CartType[]) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, products }),
        }
      );
      if (response.ok) {
        setText("Update cart");
        setAlert("Item added successfully!", "success");
      } else {
        setAlert("Failed to add product", "error");
      }
    } catch (error) {
      setAlert("Error adding item", "error");
    }
  };

  const removeCartItem = async (productId: number | undefined) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/cart`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
          body: JSON.stringify({ productId }), 
        }
      );
      if (response.ok) {
        setAlert("Item removed successfully", "success");
        setText("Add to cart")
      } else {
        setAlert("Failed to remove item", "error");
      }
    } catch (error) {
      setAlert("Failed to remove item", "error");
    }
  };

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setText("Adding to cart...");
      addToCart([{ productId: productId, count: count, price: price }]);
    }
  };

  return (
    <div className="flex h-11 gap-4">
      <div className="bg-[#F1F1F1] flex gap-2 p-3 w-auto text-sm text-center rounded-md">
        <span
          className="opacity-50 cursor-pointer  hover:bg-slate-400 w-4"
          onClick={() => ( count > 1 ? setCount(count - 1) : text === "Update cart" ? removeCartItem(productId) : false)}
        >
          {text === "Add to cart" ? (
            "-"
          ) : count > 1 ? (
            "-"
          ) : (
            <Image src={Trash} alt="-" height={20} width={20} />
          )}
        </span>
        <span className="font-bold">{count}</span>
        <span
          className="opacity-50 cursor-pointer hover:bg-slate-400 w-4"
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
        {text}
      </Button>
    </div>
  );
};

export default Quantity;
