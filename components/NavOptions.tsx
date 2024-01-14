"use client";
import Image from "next/image";
import Burger from "../public/assets/shared/tablet/icon-hamburger.svg";
import { useState } from "react";
import Category from "./Category";

const NavOptions = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <Image
          className="hover:scale-105 cursor-pointer"
          onClick={() => setOpen(!open)}
          src={Burger}
          alt="X"
        />
      )}
      {open && (
        <h3
          className="hover:scale-110 hover:text-red-500 text-2xl font-bold cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          X
        </h3>
      )}
      {open && (
        <>
          <div className="fixed w-screen h-full top-0 left-0 bg-black -z-40 opacity-50" />
          <div className="absolute top-24 bg-white w-full -m-5 px-6 pb-9 text-black pt-28 z-[1000] rounded-b-lg rounded-l-lg rounded-t-none">
            <Category />
          </div>
        </>
      )}
    </>
  );
};

export default NavOptions;
