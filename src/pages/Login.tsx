import React, { useState } from "react";
import LoginForm from "../component/LoginForm";
import SignUpForm from "../component/SignUpForm";

const LoginSwap = "swap login button";
const SignUpSwap = "swap signup button";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwap = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;

    if (button.name === LoginSwap) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }

  return (
      <div className="flex min-h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute flex flex-col w-1/3 top-1/4">
        <div className="flex flex-row justify-center mb-5">
          <button
            name={LoginSwap}
            type="button"
            className={"group relative flex w-full justify-center rounded-md mr-1 bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
            hidden={isLogin}
            onClick={handleSwap}
          >
              Login
          </button>
          <button
            name={SignUpSwap}
            type="button"
            className="group relative flex w-full justify-center rounded-md ml-1 bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            hidden={!isLogin}
            onClick={handleSwap}
          >
              Sign Up
          </button>
        </div>
        {
          isLogin ?
          <LoginForm />
          :
          <SignUpForm />
        }
        </div>
      </div>
  )
};

export default Login;