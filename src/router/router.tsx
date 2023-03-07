import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import App from "../pages/App";
import Club from "../pages/Club";
import AppliedClub from "../pages/AppliedClub";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "clubs/:page",
        element: <Club />
      },
      {
        path: "applied/:page",
        element: <AppliedClub />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

export default Router;