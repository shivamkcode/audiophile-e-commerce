"use client";
import Image from "next/image";
import CartIcon from "../public/assets/shared/desktop/icon-cart.svg";
import { useEffect, useState } from "react";
import { Data } from "@/app/page";
import Button from "./Button";
import Link from "next/link";
import { useAlert } from "@/app/alertContext";
import Trash from "../public/assets/cart/trash.png";
export interface CartData {
  id: number;
  price: number;
  productId: number;
  quantity: number;
  userId: number;
}

interface User {
  data: { username: string };
}

const Cart = () => {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState<CartData[]>([]);
  const [data, setData] = useState<Data[]>([]);
  const [counters, setCounters] = useState<{ [productId: number]: number }>({});
  const [user, setUser] = useState<User>();
  const { setAlert } = useAlert();

  const getData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/`
    );
    const data = await response.json();
    setData(data);
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/login`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (response.ok) {
        const user: User = await response.json();
        setUser(user);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
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
      setAlert("Failed to get cart", "error");
    }
  };

  const UpdateCart = async (updatedCounters: {
    [productId: number]: number;
  }) => {
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
        setAlert(data.message, "success");
      } else {
        setAlert("Failed to update cart", "error");
      }
    } catch (error) {
      setAlert("Failed to update cart", "error");
    }
  };

  const removeCartItem = async (productId: number) => {
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
        getCart();
      } else {
        setAlert("Failed to remove item", "error");
      }
    } catch (error) {
      setAlert("Failed to remove item", "error");
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
          body: JSON.stringify({}),
        }
      );
      if (response.ok) {
        setAlert("Cart deleted successfully", "success");
        getCart();
      } else {
        setAlert("Failed to delete cart", "error");
      }
    } catch (error) {
      setAlert("Failed to delete cart", "error");
    }
  };

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
    if (counters[productId] > 1) {
      setCounters((prevCounters) => {
        const newCounters = {
          ...prevCounters,
          [productId]: prevCounters[productId] - 1,
        };
        UpdateCart(newCounters);
        return newCounters;
      });
    } else {
      removeCartItem(productId);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    getData();
    if (token) {
      getCart();
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="group rounded-3xl overflow-hidden flex items-center gap-2">
        {user && (
          <h5 className="text-sm">
          Hi, <span className="capitalize">{user?.data.username}</span>
        </h5>
        )}
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
          <div
            className="fixed w-screen h-screen top-0 left-0 bg-black opacity-50 -z-40"
            onClick={toggleCart}
          />
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
                          <Link
                            href={`/product/${product?.id}`}
                            onClick={toggleCart}
                            className="text-[15px] font-bold"
                          >
                            {product?.name.split(" ").slice(0, -1).join(" ")}
                          </Link>
                          <h5 className="text-sm font-bold opacity-50">
                            $ {cart.price}
                          </h5>
                        </div>
                      </div>
                      <div className="bg-[#F1F1F1] flex gap-2 p-3 w-auto text-sm text-center rounded-md">
                        <span
                          className="opacity-50 cursor-pointer hover:bg-slate-400 w-4"
                          onClick={() => handleDecrement(cart.productId)}
                        >
                          {count > 1 ? (
                            "-"
                          ) : (
                            <Image src={Trash} alt="-" height={20} width={20} />
                          )}
                        </span>
                        <span className="font-bold">{count}</span>
                        <span
                          className="opacity-50 cursor-pointer hover:bg-slate-400 w-4"
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
