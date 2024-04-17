import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";


const App = () => {
  return (
    <div className="overflow-hidden">
        <Header />
        <Outlet />
        <Sidebar />
        <Footer />
    </div>
  );
};

export default App;