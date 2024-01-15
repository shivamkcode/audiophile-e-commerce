"use client";

import React, { useState } from "react";

interface InputProps {
  name?: string;
  type: string;
  capital: boolean;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  setEmailError?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  capital,
  placeholder,
  onChange,
  value,
  setEmailError,
}) => {
  const [err, setErr] = useState(false);
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
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleEmailBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'email' && setEmailError) {
      if (!isValidEmail(e.target.value)) {
        setEmailError(true);
        setErr(true)
      }else{
        setEmailError(false);
        setErr(false)
      }
    }
  };

  return (
    <input
      id={name}
      name={name}
      className={`hover:scale-[0.99] caret-[#D87D4A]  border  focus:border-[#D87D4A] focus:outline-none ${err ? 'text-[#CD2C2C] border-[#CD2C2C] border-2' : 'border-[#CFCFCF] text-black'}`}
      onBlur={handleEmailBlur}
      style={style}
      type={type}
      value={capital ? capitalize(value) : value}
      autoCapitalize="on"
      autoCorrect="on"
      autoComplete="on"
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  );
};

export default Input;
