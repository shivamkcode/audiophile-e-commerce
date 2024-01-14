import Link from "next/link";
import React from "react";
import Fb from "../public/assets/shared/desktop/icon-facebook.svg";
import X from "../public/assets/shared/desktop/icon-twitter.svg";
import Insta from "../public/assets/shared/desktop/icon-instagram.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#101010] text-white pt-16 pb-12 px-6 mb-0 mt-auto text-center sm:text-left sm:px-10 md:px-20 lg:px-40">
      <div className="flex flex-col md:flex-row justify-between items-center pb-9">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold mb-8 md:mb-0">audiophile</h1>
        </Link>
        <div className="flex flex-col sm:flex-row gap-4 uppercase">
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
      </div>
      <p className="mb-14 opacity-50 md:w-2/4">
        Audiophile is an all in one stop to fulfill your audio needs. We are a
        small team of music lovers and sound specialists who are devoted to
        helping you get the most out of personal audio. Come and visit our demo
        facility - we are open 7 days a week.
      </p>
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <p className="opacity-50 mb-12 ">Copyright 2023. All Rights Reserved</p>
        <div className="flex gap-4 justify-center md:-mt-20">
          <Link className="group" href={"https://www.facebook.com"}>
            <Image className="group-hover:filter group-hover:brightness-75 group-hover:sepia group-hover:scale-105" src={Fb} alt="logo" />
          </Link>
          <Link className="group" href={"https://twitter.com/?lang=en"}>
            <Image className="group-hover:filter group-hover:brightness-75 group-hover:sepia group-hover:scale-105" src={X} alt="logo" />
          </Link>
          <Link className="group" href={"https://www.instagram.com"}>
            <Image className="group-hover:filter group-hover:brightness-75 group-hover:sepia group-hover:scale-105" src={Insta} alt="logo" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
