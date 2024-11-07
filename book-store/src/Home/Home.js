import React from "react";
// import Navbar from "./Navbar";
import NavBar from "./Navbar";
import AllBooks from "./AllBooks";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

// import AppBarExample from "./Navbar";

const Home = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
