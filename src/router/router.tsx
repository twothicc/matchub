import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import Spinner from "../component/Spinner";

const App = React.lazy(() => import("../pages/App"));
const Login = React.lazy(() => import("../pages/Login"));
const Club = React.lazy(() => import("../pages/Club"));
const AppliedClub = React.lazy(() => import("../pages/AppliedClub"));
const ClubDetails = React.lazy(() => import("../pages/ClubDetails"));

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "clubs/:page",
        element: (
          <Suspense fallback={<Spinner />}>
            <Club />
          </Suspense>
        )
      },
      {
        path: "applied/:page",
        element: (
          <Suspense fallback={<Spinner />}>
            <AppliedClub />
          </Suspense>
        )
      },
      {
        path: "clubdetails/:id",
        element: (
          <Suspense fallback={<Spinner />}>
            <ClubDetails />
          </Suspense>
        )
      }
    ]
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Spinner />}>
        <Login />
      </Suspense>
    )
  }
]);

export default Router;