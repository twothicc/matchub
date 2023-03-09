import { LockClosedIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { login, setUser } from "../slices/loginSlice";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log(JSON.stringify(Object.fromEntries(formData)))
    
    await fetch("http://localhost:5000/auth/signup", 
    { 
      method: "post",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    .then(res => {
      if (res.status === 401) {
        throw new Error("signup unsuccessful")
      }

      return res.json();
    })
    .then(res => {
      console.log(res.msg);
      dispatch(login());
      dispatch(dispatch(setUser(res.data)));
      navigate("/clubs/0");
    }).catch(err => {
      console.error(err);
    });
  };

  return (
    <>
      <div className="relative w-full max-w-md space-y-8">
          <div>
              <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="University Class Registration"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign Up
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
              </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
              <div className="-space-y-px rounded-md shadow-sm">
              <div>
                  <label htmlFor="email-address" className="sr-only">
                  Email address
                  </label>
                  <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  />
              </div>
              <div>
                  <label htmlFor="name" className="sr-only">
                  Fullname
                  </label>
                  <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Fullname"
                  />
              </div>
              <div>
                  <label htmlFor="password" className="sr-only">
                  Password
                  </label>
                  <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  />
              </div>
              </div>

              <div>
                  <button
                      type="submit"
                      className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                      </span>
                      Sign Up
                  </button>
              </div>
          </form>
      </div>
    </>
  )
};

export default SignUpForm;