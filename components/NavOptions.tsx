"use client";
import Image from "next/image";
import Burger from "../public/assets/shared/tablet/icon-hamburger.svg";
import { useState } from "react";
import Link from "next/link";
import Headphones from "../public/assets/shared/desktop/image-category-thumbnail-headphones.png";
import Speakers from "../public/assets/shared/desktop/image-category-thumbnail-speakers.png";
import Earphones from "../public/assets/shared/desktop/image-category-thumbnail-earphones.png";
import ArrowRight from "../public/assets/shared/desktop/icon-arrow-right.svg";

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
            <div className="uppercase text-center font-bold flex flex-col sm:flex-row gap-20 sm:gap-10 sm:mt-10 items-center md:gap-7 md:mt-20">
              <Link
                href="/category/headphones"
                className="h-52 sm:h-40 md:h-52 bg-[#f1f1f1] w-full relative rounded-lg hover:text-[#D87D4A] cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <Image
                  className="-top-16 sm:-top-20 absolute w-52 left-2/4 -translate-x-2/4"
                  src={Headphones}
                  alt="headphones"
                />
                <h3 className="mt-32 sm:mt-20 md:mt-28  mb-3 text-lg text-black">
                  Headphones
                </h3>
                <div className="flex gap-3 items-center  justify-center">
                  <span className="text-sm opacity-50">Shop</span>
                  <Image className="w-2 h-3" src={ArrowRight} alt=">" />
                </div>
              </Link>

              <Link
                href="/category/speakers"
                className="h-52 sm:h-40 md:h-52 bg-[#f1f1f1] w-full relative rounded-lg hover:text-[#D87D4A] cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <Image
                  className="-top-16 sm:-top-[70px] absolute w-52 left-2/4 -translate-x-2/4"
                  src={Speakers}
                  alt="Speakers"
                />
                <h3 className="mt-32 sm:mt-20 md:mt-28 mb-3 text-lg text-black">
                  Speakers
                </h3>
                <div className="flex gap-3 items-center  cursor-pointer justify-center">
                  <span className="text-sm opacity-50">Shop</span>
                  <Image className="w-2 h-3" src={ArrowRight} alt=">" />
                </div>
              </Link>

              <Link
                href="/category/earphones"
                className="h-52 sm:h-40 md:h-52 bg-[#f1f1f1] w-full relative rounded-lg hover:text-[#D87D4A] cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <Image
                  className="-top-16 absolute w-52 left-2/4 -translate-x-2/4"
                  src={Earphones}
                  alt="Earphones"
                />
                <h3 className="mt-32 sm:mt-20 md:mt-28 mb-3 text-lg text-black">
                  Earphones
                </h3>
                <div className="flex gap-3 items-center  cursor-pointer justify-center">
                  <span className="text-sm opacity-50">Shop</span>
                  <Image className="w-2 h-3" src={ArrowRight} alt=">" />
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NavOptions;
