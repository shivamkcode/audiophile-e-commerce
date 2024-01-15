"use client";

import React, { useState } from "react";
import Login from "./Login";

interface ButtonProps {
  color: string;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode | null;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({ color, onClick, disabled, width, children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const authenticate = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      onClick()
    } else {
      onClick()
      setShowLogin(true)
    }
  };

  const style = {
    backgroundColor:
      color === "o" ? "#D87D4A" : color === "b" ? "#000" : "transparent",
    color: color ? "white" : "black",
    width: width ? width :"auto",
    padding: "10px 20px",
    opacity: disabled ? 0.5 : 1,
    border: color ? "none" : "1px solid black",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "scale(.99)";
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (color === "o") {
      e.currentTarget.style.backgroundColor = "#FBAF85";
    } else if (color === "b") {
      e.currentTarget.style.backgroundColor = "#4C4C4C";
    } else {
      e.currentTarget.style.backgroundColor = "black";
      e.currentTarget.style.color = "white";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (color === "o") {
      e.currentTarget.style.backgroundColor = "#D87D4A";
    } else if (color === "b") {
      e.currentTarget.style.backgroundColor = "#000";
    } else {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.color = "black";
    }
  };

  return (
    <>
      <button
        className="uppercase"
        style={style}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        disabled={disabled}
        onClick={() => {
          authenticate();
        }}
      >
        {children}
      </button>
      <Login showLogin={showLogin} setShowLogin={setShowLogin} />
    </>
  );
};

export default Button;
