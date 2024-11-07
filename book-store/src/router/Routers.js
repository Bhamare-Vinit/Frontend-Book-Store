import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import AllNotes from "../Home/AllBooks";
import Details from "../Details_page/Details";
import MyCart from "../Details_page/MyCart";
import Checkout from "../Details_page/Checkout";
import Wishlist from "../Details_page/Wishlist";
import OrderedList from "../Details_page/OrderedList";

const AppRoutes = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/signup",
  //     element: <Register />,
  //   },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "",
        element: <AllNotes />,
      },
      {
        path: "/home/:bookId",
        element: <Details />,
      },
      {
        path: "/home/MyCart",
        element: <MyCart />,
      },
      {
        path: "/home/MyCart/Checkout",
        element: <Checkout />,
      },
      {
        path: "/home/Wishlist",
        element: <Wishlist />,
      },
      {
        path: "/home/orderedItems",
        element: <OrderedList />,
      },
      //   {
      //     path: "archive",
      //     element: <Archived />,
      //   },
      //   {
      //     path: "trash",
      //     element: <Trashed />,
      //   },
    ],
  },
]);

const RoutingModule = () => {
  return <RouterProvider router={AppRoutes} />;
};

export default RoutingModule;
