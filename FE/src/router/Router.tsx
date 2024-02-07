import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { HomeScreen } from "../pages/HomeScreen";
import { PrivateRouter } from "./PrivateRouter";

export const Router = createBrowserRouter([
  {
    path: "/:id",
    element: (
      <PrivateRouter>
        <HomeScreen />
      </PrivateRouter>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register/:num",
    element: <Register />,
  },
  {
    path: "*",
    element: <PrivateRouter />,
  },
]);
