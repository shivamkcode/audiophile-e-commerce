import Link from "next/link";
import React from "react";

interface LinkProps {
  href: string;
  text: string;
  className: string;
  color: string;
}

// const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
//     if (color === "o") {
//       e.currentTarget.style.backgroundColor = "#FBAF85";
//     } else if (color === "b") {
//       e.currentTarget.style.backgroundColor = "#4C4C4C";
//     } else {
//       e.currentTarget.style.backgroundColor = "black";
//       e.currentTarget.style.color = "white";
//     }
//   };

const LinkButton: React.FC<LinkProps> = ({ href, text, className, color }) => {
  return (
    <Link
      className={`
    bg-${color === "o" ? "[#D87D4A]" : color === "b" ? "black" : "transparent"}
    text-${color ? "white" : "black"}
    px-5 py-3 border-black ${color ? "" : "border"}
    cursor-pointer
    ${
      color === "o" ? "hover:bg-[#FBAF85]" : color === "b" ? "hover:bg-[#4C4C4C]" : "hover:bg-black"
    } 
    hover:text-white
    transition-all duration-300 ease-in-out uppercase ${className}`}
      href={href}
    >
      {text}
    </Link>
  );
};

export default LinkButton;
