import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import CartProvider from "./contexts/CartContext";
import ProductProvider from "./contexts/ProductContext";
import SidebarProvider from "./contexts/SidebarContext";
import { UserContextProvider } from "./contexts/UserContext";
import "./index.css";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/signin",
        element: <Signin />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/product/:id",
        element: <ProductDetails/>,
      },
      {
        path: "/orders",
        element: <Orders />
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
  <SidebarProvider>
    <CartProvider>
      <ProductProvider>
      <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </ProductProvider>
    </CartProvider>
  </SidebarProvider>
  </UserContextProvider>
);