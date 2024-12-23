"use client";
import Image from "next/image";
import CartIcon from "../public/assets/shared/desktop/icon-cart.svg";
import { useEffect, useState } from "react";
import { Data } from "@/app/page";
import Button from "./Button";
import Link from "next/link";
import { useAlert } from "@/app/alertContext";

export interface CartData {
  id: number;
  price: number;
  productId: number;
  quantity: number;
  userId: number;
}

const Cart = () => {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState<CartData[]>([]);
  const [data, setData] = useState<Data[]>([]);
  const [counters, setCounters] = useState<{ [productId: number]: number }>({});
  const { setAlert } = useAlert();

  const getData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/`
    );
    const data = await response.json();
    setData(data);
  };

  const getCart = async () => {
    const token = localStorage.getItem("token");
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
        setCart(carts.data);
      }
    } catch (error) {
      setAlert("Failed to get cart", 'error');
    }
  };

  const deleteCart = async () => {
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
        }
      );
      if (response.ok) {
        setAlert("Cart Deleted Successfully",'success');
        getCart();
      }
    } catch (error) {
      setAlert("Failed to delete cart", 'error');
    }
  };

  useEffect(() => {
    getData();
    getCart();
  }, []);

  const toggleCart = () => {
    const token = localStorage.getItem("token");
    if (token) {
      getCart();
      setShowCart(!showCart);
      if (!showCart) {
        const newCounters: { [productId: number]: number } = {};
        cart.forEach((cartItem) => {
          newCounters[cartItem.productId] = cartItem.quantity;
        });
        setCounters(newCounters);
      }
    }
  };

  const handleIncrement = async (productId: number) => {
    setCounters((prevCounters) => {
      const newCounters = {
        ...prevCounters,
        [productId]: (prevCounters[productId] || 0) + 1,
      };
      UpdateCart(newCounters);
      return newCounters;
    });
  };

  const handleDecrement = async (productId: number) => {
    if (counters[productId] > 0) {
      setCounters((prevCounters) => {
        const newCounters = {
          ...prevCounters,
          [productId]: prevCounters[productId] - 1,
        };
        UpdateCart(newCounters);
        return newCounters;
      });
    }
  };

  const UpdateCart = async (updatedCounters: { [productId: number]: number }) => {
    const token = localStorage.getItem("token");
    const updatedProducts = cart.map((item) => ({
      productId: item.productId,
      count: updatedCounters[item.productId] || item.quantity,
      price: item.price,
    }));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, products: updatedProducts }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAlert(data.message, 'success');
      } else {
        setAlert("Failed to update cart",'error');
      }
    } catch (error) {
      setAlert("Failed to update cart",'error');
    }
  };

  return (
    <>
      <div className="group rounded-3xl overflow-hidden">
        <Button color="" onClick={toggleCart} disabled={false}>
          <Image
            className="group-hover:filter group-hover:brightness-75 group-hover:sepia group-hover:scale-105 cursor-pointer"
            src={CartIcon}
            alt="cart"
          />
        </Button>
      </div>
      {showCart && (
        <>
          <div className="fixed w-screen h-screen top-0 left-0 bg-black opacity-50 -z-40" onClick={toggleCart}/>
          <div className="absolute mt-6 top-[70px] left-2/4 -translate-x-2/4 sm:left-auto sm:translate-x-0 sm:right-10 md:right-0 w-11/12 sm:w-96 bg-white z-50 text-black p-8 rounded-lg flex flex-col gap-6">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold tracking-widest ">
                Cart ({cart.length})
              </h2>
              <span
                onClick={() => (cart.length > 0 ? deleteCart() : false)}
                className="opacity-50 cursor-pointer hover:text-red-500"
              >
                Remove all
              </span>
            </div>

            {cart
              ?.filter((cart) => cart.quantity > 0)
              .map((cart, i) => {
                const product = data.find((item) => item.id === cart.productId);
                const count = counters[cart.productId] || cart.quantity;

                return (
                  <div key={i}>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 items-center">
                        <Image
                          className="rounded-xl "
                          src={`/${product?.image.mobile.slice(2)}`}
                          alt={`${product?.name}`}
                          width={64}
                          height={64}
                        />
                        <div className="">
                          <h4 className="text-[15px] font-bold">
                            {product?.name.split(" ").slice(0, -1).join(" ")}
                          </h4>
                          <h5 className="text-sm font-bold opacity-50">
                            $ {cart.price}
                          </h5>
                        </div>
                      </div>
                      <div className="bg-[#F1F1F1] flex gap-6 p-3 w-auto text-sm">
                        <span
                          className="opacity-25 cursor-pointer hover:bg-slate-400"
                          onClick={() => handleDecrement(cart.productId)}
                        >
                          -
                        </span>
                        <span className="font-bold">{count}</span>
                        <span
                          className="opacity-25 cursor-pointer hover:bg-slate-400"
                          onClick={() => handleIncrement(cart.productId)}
                        >
                          +
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="flex justify-between items-center tracking-wider">
              <h3 className="uppercase text-sm opacity-50">Total</h3>
              <h3 className="text-lg font-bold">
                ${" "}
                {cart
                  .reduce(
                    (total, item) =>
                      total +
                      item.price * (counters[item.productId] || item.quantity),
                    0
                  )
                  .toLocaleString("en-US")}
              </h3>
            </div>
            <Link href={"/checkout"}>
              <Button
                color="o"
                width="100%"
                disabled={cart.length === 0}
                onClick={() => {
                  UpdateCart(counters);
                  setShowCart(false);
                }}
              >
                Checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
