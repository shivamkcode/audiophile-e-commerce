"use client";

import React, { useState } from "react";

interface InputProps {
  name?: string;
  type: string;
  capital: boolean;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  setEmailError?: React.Dispatch<React.SetStateAction<string | null>>;
  setPasswordError?: React.Dispatch<React.SetStateAction<string | null>>;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  capital,
  placeholder,
  onChange,
  value,
  setEmailError,
  setPasswordError,
}) => {
  const [err, setErr] = useState<string | null>(null);
  const style = {
    width: "100%",
    padding: "10px",
    backgroundColor: "transparent",
    borderRadius: "8px",
  };

  function capitalize(s: string) {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password: string) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'email' && setEmailError) {
      if (!isValidEmail(e.target.value)) {
        const errorMsg = "Please enter a valid email address.";
        setEmailError(errorMsg);
        setErr(errorMsg);
      } else {
        setEmailError(null);
        setErr(null);
      }
    }
    if (type === 'password' && setPasswordError) {
      if (!isValidPassword(e.target.value)) {
        const errorMsg = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.";
        setPasswordError(errorMsg);
        setErr(errorMsg);
      } else {
        setPasswordError(null);
        setErr(null);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (type === 'email' && setEmailError) {
      if (!isValidEmail(e.target.value)) {
        const errorMsg = "Please enter a valid email address.";
        setEmailError(errorMsg);
        setErr(errorMsg);
      } else {
        setEmailError(null);
        setErr(null);
      }
    }
    if (type === 'password' && setPasswordError) {
      if (!isValidPassword(e.target.value)) {
        const errorMsg = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.";
        setPasswordError(errorMsg);
        setErr(errorMsg);
      } else {
        setPasswordError(null);
        setErr(null);
      }
    }
  };

  return (
    <div>
      <input
        id={name}
        name={name}
        className={`hover:scale-[0.99] caret-[#D87D4A] border focus:border-[#D87D4A] focus:outline-none ${err ? 'text-[#CD2C2C] border-[#CD2C2C] border-2' : 'border-[#CFCFCF] text-black'}`}
        onBlur={handleBlur}
        style={style}
        type={type}
        value={capital ? capitalize(value) : value}
        autoCapitalize="on"
        autoCorrect="on"
        autoComplete="on"
        onChange={handleChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Input;
