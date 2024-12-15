import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Disbook from "./Disbook.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Disbook></Disbook>,
  },
  {
    path: "signup",
    element: <Signup></Signup>,
  },
  {
    path: "login",
    element: <Login></Login>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
