"use client";
import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

interface LoginProp {
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProp> = ({ showLogin, setShowLogin }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const token = await response.json();
        localStorage.setItem("token", token.data);
        console.log("Login successful!", "success");
      }
    } catch (error) {
      console.log("Login failed.", error);
    }
  };

  const handleSignup = async () => {
    const response = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      const token = await response.json();
      console.log(token);
      console.log("Signup successful!", "success");
      setShowLogin(true);
    } else {
      console.log("Signup failed.", "error");
    }
  };

  return (
    <>
      {showLogin && (
        <>
          <div className="fixed w-screen h-screen top-0 left-0 bg-black opacity-50 z-[999]" />
          <div className="fixed bg-white p-10 w-96 flex flex-col gap-4 rounded-lg left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-[1000]">
            <div className="flex justify-between text-black items-center">
              <h1 className="text-3xl font-bold ">Login</h1>
              <h3
                className="hover:scale-110 hover:text-red-500 text-2xl font-bold cursor-pointer"
                onClick={() => setShowLogin(false)}
              >
                X
              </h3>
            </div>
            <Input
              type={"email"}
              placeholder={"email"}
              value={email}
              capital={false}
              onChange={(e) => setEmail(e.target.value)}
              setEmailError={setEmailError}
            />
            <div className="flex items-center relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={"Password"}
                value={password}
                capital={false}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute right-3 opacity-50 cursor-pointer hover:text-sky-800 hover:font-bold" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <Button
              color="o"
              disabled={!email || !password || !emailError}
              onClick={() => {
                setShowLogin(false);
                handleLogin();
              }}
              >Login</Button>
            <Button
              color="b"
              disabled={false}
              onClick={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
            >Create New Account</Button>
          </div>
        </>
      )}
      {showSignup && (
        <>
          <div className="fixed w-screen h-screen top-0 left-0 bg-black opacity-50 z-[999]" />
          <div className="fixed bg-white p-10 w-96 flex flex-col gap-4 rounded-lg left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-[1001]">
            <div className="flex justify-between text-black items-center">
              <h1 className="text-3xl font-bold ">Signup</h1>
              <h3
                className="hover:scale-110 hover:text-red-500 text-2xl font-bold cursor-pointer"
                onClick={() => setShowSignup(false)}
              >
                X
              </h3>
            </div>
            <Input
              type="text"
              placeholder={"Username"}
              value={username}
              capital={false}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type={"email"}
              placeholder={"email"}
              value={email}
              capital={false}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={"Password"}
                value={password}
                capital={false}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <Button
              color="o"
              onClick={() => {
                handleSignup();
                setShowSignup(false);
              }}
              disabled={!username || !password || !emailError}
            >Create Account</Button>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
