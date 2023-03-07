import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import App from "../pages/App";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

export default Router;