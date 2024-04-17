import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import { FiTrash2 } from "react-icons/fi";
import { IoMdArrowForward } from "react-icons/io";
import CartItem from "../components/CartItem";
import { CartContext } from "../contexts/CartContext";
import { SidebarContext } from "../contexts/SidebarContext";
import { UserContext } from "../contexts/UserContext";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const {userInfo} = useContext(UserContext);
  const { cart, clearCart, itemAmount, total } = useContext(CartContext);
  const navigate = useNavigate();

  function extractProps(cart) {
    return cart.map(item => ({
      amount: item.amount,
      price: item.amount * item.price,
      id: item.id,
      name: item.title // Assuming the title property represents the name
    }));
  }

  const checkout = async (ev) => {
    ev.preventDefault();
    const customerID = userInfo?.id;
    const extractedItems = extractProps(cart);
    var d = new Date();
    const datenow = d.toISOString();
    const timenow = d.getTime();
    const response = await fetch("http://localhost:8000/orders/checkout", {
      method: 'POST',
      body: JSON.stringify({customerID, extractedItems, total, itemAmount, datenow, timenow}),
      headers: {'Content-Type':'application/json'},
    });

    if (response.status === 201) {
      alert('Order successful!');
      console.log(response)
      clearCart();
      
    } else {
      alert('Order failed! Try again.');
    }
  }

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } "w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]"`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">Shopping Bag ({itemAmount})</div>
        <div
          onClick={handleClose}
          className="cursor-poniter w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </div>
      <div className="flex flex-col gap-y-3  mt-4">
        <div className="flex w-full justify-between items-center">
          {/* total */}
          <div className="font-semibold">
            <span className="mr-2">Subtotal:</span> ${" "}
            {parseFloat(total).toFixed(2)}
          </div>
          {/* clear cart icon */}
          <div
            onClick={clearCart}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
        </div>
        <Link
          to={"/"}
          className="bg-gray-200 flex p-3 justify-center items-center text-primary w-full font-medium"
        >
          View Cart
        </Link>
        <Link
          to={"/"}
          onClick={checkout}
          className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;