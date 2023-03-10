import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FunctionalErrorBoundary from "../component/ErrorBoundary";
import LoginForm from "../component/LoginForm";
import SignUpForm from "../component/SignUpForm";

const LoginSwap = "swap login button";
const SignUpSwap = "swap signup button";

const Login = () => {
  const navigate = useNavigate();
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

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <FunctionalErrorBoundary children={
      <div className="flex min-h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute flex flex-col max-w-md max-[425px]:w-2/3 md:w-1/2 top-1/4">
        <div className="flex flex-row justify-center mb-5">
          <button
            name={LoginSwap}
            type="button"
            className={
              !isLogin ? 
              "group relative flex w-full justify-center rounded-md mr-1 bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              :
              "group relative flex w-full justify-center rounded-md mr-1 bg-gray-300 py-2 px-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            }
            disabled={isLogin}
            onClick={handleSwap}
          >
              Login
          </button>
          <button
            name={SignUpSwap}
            type="button"
            className={
              isLogin ? 
              "group relative flex w-full justify-center rounded-md mr-1 bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              :
              "group relative flex w-full justify-center rounded-md mr-1 bg-gray-300 py-2 px-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            }
            disabled={!isLogin}
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
        <button
          className="group relative flex w-full justify-center rounded-md mt-5 mr-1 bg-gray-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleBack}
        >
          Back
        </button>
        </div>
      </div>
    } />
  )
};

export default Login;