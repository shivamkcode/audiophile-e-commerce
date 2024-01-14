import Link from "next/link";
import Cart from "./Cart";
import NavOptions from "./NavOptions";
import React from "react";

const Navbar = () => {
  return (
    <nav className=" bg-black md:px-20 lg:px-40">
      <div className="flex justify-between items-center top-0 left-0 w-full relative z-50 border-b border-gray-400 p-5 text-white md:px-0 ">
        <div className="md:hidden">
          <NavOptions />
        </div>
        <Link href={"/"}>
          <h1 className="text-2xl font-bold">audiophile</h1>
        </Link>
        <div className="hidden md:flex justify-evenly gap-4 uppercase">
          <Link className="hover:text-[#D87D4A]" href={"/"}>
            Home
          </Link>
          <Link className="hover:text-[#D87D4A]" href={"/category/headphones"}>
            Headphones
          </Link>
          <Link className="hover:text-[#D87D4A]" href={"/category/speakers"}>
            Speakers
          </Link>
          <Link className="hover:text-[#D87D4A]" href={"/category/earphones"}>
            Earphones
          </Link>
        </div>
        <Cart />
      </div>
    </nav>
  );
};

export default Navbar;
