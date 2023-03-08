import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Club from "../pages/Club";
import AppliedClub from "../pages/AppliedClub";
import ClubDetails from "../pages/ClubDetails";
import React, { Suspense } from "react";
import Spinner from "../component/Spinner";

const App = React.lazy(() => import("../pages/App"));

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
        element: <Club />
      },
      {
        path: "applied/:page",
        element: <AppliedClub />
      },
      {
        path: "clubdetails/:id",
        element: <ClubDetails />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

export default Router;