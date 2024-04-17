import React, { useContext, useEffect, useState } from "react";
import { BsBag } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { SidebarContext } from "../contexts/SidebarContext";
import { UserContext } from "../contexts/UserContext";
import Logo from "../img/logo.svg";


const Header = () => {
  // header state
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const {setUserInfo,userInfo} = useContext(UserContext);
  const { cart, clearCart, itemAmount, total } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch( 'http://localhost:8000/customer/profile' , {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  });

  function logout() {
    fetch('http://localhost:8000/customer/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
    clearCart();
    window.location.reload();
  }

  const firstName = userInfo?.firstName;

  // event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  return (
    <header
      className={`${
        isActive ? "bg-white/100 py-4 shadow-md" : "bg-white/50 py-5"
      } fixed w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/"}>
          <div className="flex w-[40px]">
            <img src={Logo} alt="" />
            <div class="font-semibold mt-2 ml-4">TRENDZ</div>
          </div>
      
        </Link>
        <div className="flex space-x-8">
        {!firstName && (
          <Link to={"/signin"}>
          <div>
            <button class="px-4 py-0.5 hover:bg-cyan-600 bg-sky-500/75 rounded-full text-white">
              Sign in
            </button>
          </div>
        </Link>
        )}

        
          
          {firstName && (
            <>
              <Link to={'/'}><span class="test-black">Hi, {firstName}!</span></Link>
            
            <Link to={"/"} onClick={logout}>
          <div>
            <button class="px-4 py-0.5 hover:bg-cyan-600 bg-sky-500/75 rounded-full text-white">
              Logout
            </button>
          </div>
        </Link>
            </>
              
        )}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative"
          >
            <BsBag className="text-2xl" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
        </div>
        
        
      </div>
    </header>
  );
};

export default Header;
