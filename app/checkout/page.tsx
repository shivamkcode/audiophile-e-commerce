"use client";
import { CartData } from "@/components/Cart";
import Input from "@/components/Input";
import Image from "next/image";
import { ChangeEvent, useEffect, useReducer, useState } from "react";
import { Data } from "../page";
import Button from "@/components/Button";
import Tick from "@/public/assets/checkout/icon-order-confirmation.svg";
import Link from "next/link";

interface State {
  name: string;
  email: string;
  number: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMethod: string;
  eMoneyNumber: string;
  eMoneyPin: string;
}

const initialState: State = {
  name: "",
  email: "",
  number: "",
  address: "",
  zipCode: "",
  city: "",
  country: "",
  paymentMethod: "e-Money",
  eMoneyNumber: "",
  eMoneyPin: "",
};

type Action = { type: "update"; name: string; value: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "update":
      return { ...state, [action.name]: action.value };
    default:
      throw new Error();
  }
};

const Checkout = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cart, setCart] = useState<CartData[]>([]);
  const [data, setData] = useState<Data[]>([]);
  const [emailError, setEmailError] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
    );

    
  const getData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/`);
    const data = await response.json();
    setData(data);
  };

  const getCart = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/cart`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      });
      if (response.ok) {
        const carts = await response.json();
        setCart(carts.data);
      }
    } catch (error) {
      console.log("failed to get cart", error);
    }
  };

  useEffect(() => {
    getData();
    getCart();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch({ type: "update", name, value });
  };

  const handlePaymentMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch({ type: "update", name: "paymentMethod", value });
  };

  return (
    <>
    <div className="flex flex-col lg:flex-row gap-8 mx-6 sm:mx-10 md:mx-20 lg:mx-40 my-10 sm:my-20 md:my-32">
      <div className=" p-6 sm:py-8 flex flex-1 flex-col gap-6 rounded-lg bg-white">
        <h1 className="uppercase text-2xl font-bold">Checkout</h1>
        <h5 className="uppercase text-[#D87D4A] tracking-widest font-bold mt-2 sm:mt-4">
          Billing details
        </h5>
        <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2">
          <label className="flex flex-col gap-2" htmlFor="name">
            Name
            <Input
              name="name"
              type="text"
              value={state.name}
              onChange={handleInputChange}
              capital={true}
              placeholder="John Doe"
            />
          </label>
          <label className="flex flex-col gap-2" htmlFor="email">
            {emailError ? "Wrong format" : "Email Address"}
            <Input
              name="email"
              type="email"
              value={state.email}
              onChange={handleInputChange}
              capital={false}
              placeholder="John@mail.com"
              setEmailError={setEmailError}
            />
          </label>
          <label className="flex flex-col gap-2" htmlFor="number">
            Phone Number
            <Input
              name="number"
              type="text"
              value={state.number}
              onChange={handleInputChange}
              capital={false}
              placeholder="+1 234-567-8910"
            />
          </label>
        </div>

        <h5 className="uppercase text-[#D87D4A] tracking-widest font-bold mt-2">
          Shipping Info
        </h5>
        <label className="flex flex-col gap-2" htmlFor="address">
          Your Address
          <Input
            name="address"
            type="text"
            value={state.address}
            onChange={handleInputChange}
            capital={true}
            placeholder="578 Linden dr"
          />
        </label>

        <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2">
          <label className="flex flex-col gap-2" htmlFor="zipCode">
            ZIP Code
            <Input
              name="zipCode"
              type="text"
              value={state.zipCode}
              onChange={handleInputChange}
              capital={false}
              placeholder="N3H 0C9"
            />
          </label>
          <label className="flex flex-col gap-2" htmlFor="city">
            City
            <Input
              name="city"
              type="text"
              value={state.city}
              onChange={handleInputChange}
              capital={true}
              placeholder="Cambridge"
            />
          </label>
          <label className="flex flex-col gap-2" htmlFor="country">
            Country
            <Input
              name="country"
              type="text"
              value={state.country}
              onChange={handleInputChange}
              capital={true}
              placeholder="Canada"
            />
          </label>
        </div>

        <h5 className="uppercase text-[#D87D4A] tracking-widest font-bold mt-2">
          Payment Details
        </h5>
        <label
          className="flex flex-col sm:grid sm:grid-cols-2 gap-2"
          htmlFor="Payment Method"
        >
          Payment Method
          <div className="flex flex-col gap-4">
            <div
              className={`flex p-3 gap-4 w-full border border-[#CFCFCF] rounded-lg items-center hover:scale-[0.99] cursor-pointer ${
                state.paymentMethod === "e-Money" ? "border-[#D87D4A]" : ""
              }`}
            >
              <input
                className="w-5 h-5 accent-[#D87D4A] cursor-pointer"
                name="e-Money"
                type="radio"
                value="e-Money"
                checked={state.paymentMethod === "e-Money"}
                onChange={handlePaymentMethodChange}
              />
              <label className="flex flex-col gap-2" htmlFor="e-Money">
                e-Money
              </label>
            </div>
            <div
              className={`flex p-3 gap-4 w-full border border-[#CFCFCF] rounded-lg items-center hover:scale-[0.99] cursor-pointer mb-2 ${
                state.paymentMethod === "Cash on Delivery"
                  ? "border-[#D87D4A]"
                  : ""
              }`}
            >
              <input
                className="w-5 h-5 accent-[#D87D4A] cursor-pointer"
                name="cashOnDelivery"
                type="radio"
                value="Cash on Delivery"
                checked={state.paymentMethod === "Cash on Delivery"}
                onChange={handlePaymentMethodChange}
              />
              <label className="flex flex-col gap-2" htmlFor="cashOnDelivery">
                Cash on Delivery
              </label>
            </div>
          </div>
        </label>

        {state.paymentMethod === "e-Money" && (
          <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2">
            <label className="flex flex-col gap-2" htmlFor="e-Money number">
              e-Money Number
              <Input
                name="e-Money number"
                type="text"
                value={state.eMoneyNumber}
                onChange={handleInputChange}
                capital={false}
                placeholder="1234567890"
              />
            </label>
            <label className="flex flex-col gap-2" htmlFor="eMoneyPin">
              e-Money Pin
              <Input
                name="eMoneyPin"
                type="password"
                value={state.eMoneyPin}
                onChange={handleInputChange}
                capital={false}
                placeholder="1234"
              />
            </label>
          </div>
        )}
      </div>

      <div className="px-6 py-8 sm:py-8 bg-white rounded-lg flex flex-col gap-6 min-w-80 h-min">
        <h2 className="text-lg tracking-widest uppercase font-bold mb-2">
          Summary
        </h2>
        {cart
          ?.filter((cart) => cart.quantity > 0)
          .map((cart, i) => {
            const product = data.find((item) => item.id === cart.productId);
            return (
              <div className="flex items-center justify-between" key={i}>
                <div className="flex gap-4 items-center">
                  <Image
                    className="rounded-xl "
                    src={`/${product?.image.mobile.slice(2)}`}
                    alt={`${product?.name}`}
                    width={64}
                    height={64}
                  />
                  <div>
                    <h4 className="text-[15px] font-bold">
                      {product?.name.split(" ").slice(0, -1).join(" ")}
                    </h4>
                    <h5 className="text-sm font-bold opacity-50">
                      $ {cart.price}
                    </h5>
                  </div>
                </div>
                <h4 className="text-base font-bold opacity-50">
                  x{cart.quantity}
                </h4>
              </div>
            );
          })}
        <div className="mt-2 flex flex-col gap-2 uppercase">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium opacity-50 tracking-widest">
              Total
            </h4>
            <h3 className="text-lg font-bold">
              $ {total.toLocaleString("en-US")}
            </h3>
          </div>
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium opacity-50 tracking-widest">
              Shipping
            </h4>
            <h3 className="text-lg font-bold">
              <span className="line-through mr-1 text-green-500">
                $ {total > 1000 ? 50 : ""}
              </span>{" "}
              $ {(total > 1000 ? 0 : 50).toLocaleString("en-US")}
            </h3>
          </div>
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium opacity-50 tracking-widest">
              GST (included)
            </h4>
            <h3 className="text-lg font-bold">
              $ {Math.floor(total * 0.13).toLocaleString("en-US")}
            </h3>
          </div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium opacity-50 tracking-widest">
            Grand total
          </h4>
          <h3 className="text-lg font-bold">
            $ {(total > 1000 ? total : total + 50).toLocaleString("en-US")}
          </h3>
        </div>
        <Button
          color="o"
          disabled={false}
          onClick={() => setShowThankYou(true)}
        >
          Continue & Pay
        </Button>
      </div>
      {showThankYou && (
        <>
          <div className="fixed w-screen h-screen top-0 left-0 bg-black opacity-50 z-[999]" />
          <div className="fixed bg-white p-8 sm:p-10 w-max rounded-lg left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-[1001]">
            <div className="flex flex-col gap-4 md:gap-6">
              <Image src={Tick} alt="tick" />
              <h1 className="uppercase text-2xl sm:text-4xl font-bold tracking-wider flex flex-col">
                Thank you <span>for your order</span>
              </h1>
              <p className="text-base opacity-50">
                You will recieve an email confirmation shortly.
              </p>
              <div className="bg-[#F1F1F1] rounded-lg overflow-hidden flex flex-col sm:flex-row ">
                <div>
                  <div className="flex gap-4 items-center border-b m-6 mb-3">
                    <Image
                      className="rounded-xl "
                      src={`/${data
                        .find((item) => item.id === cart[0]?.productId)
                        ?.image.mobile.slice(2)}`}
                      alt={`${
                        data.find((item) => item.id === cart[0]?.productId)
                          ?.name
                      }`}
                      width={64}
                      height={64}
                    />
                    <div className="mr-4">
                      <h4 className="text-[15px] font-bold">
                        {data
                          .find((item) => item.id === cart[0]?.productId)
                          ?.name.split(" ")
                          .slice(0, -1)
                          .join(" ")}
                      </h4>
                      <h5 className="text-sm font-bold opacity-50">
                        $ {cart[0]?.price}
                      </h5>
                    </div>
                    <h4 className="text-base font-bold opacity-50 mr-0 ml-auto">
                      x{cart[0]?.quantity}
                    </h4>
                  </div>
                  <p className="text-center text-xs font-bold tracking-tight opacity-50 mb-6">
                    {cart.length > 1
                      ? `and ${cart.length - 1} other item${
                          cart.length > 2 ? "s" : ""
                        }`
                      : ""}
                  </p>
                </div>
                <div className="bg-black p-6 text-white flex flex-col justify-center">
                  <h4 className="text-sm font-medium opacity-50 tracking-widest mb-2 uppercase">
                    Grand total
                  </h4>
                  <h3 className="text-lg font-bold">
                    ${" "}
                    {(total > 1000 ? total : total + 50).toLocaleString(
                      "en-US"
                    )}
                  </h3>
                </div>
              </div>
              <Button
                color="o"
                disabled={false}
                onClick={() => setShowThankYou(false)}
              >
                <Link href={"/"}>Back to home</Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default Checkout;
