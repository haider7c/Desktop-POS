import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const menuItems = [
    {
      name: "Home",
      linnk: "/home",
    },
    {
      name: "Help",
      linnk: "/help",
    },
    {
      name: "History",
      linnk: "/history",
    },
    {
      name: "Invoicing Guide",
      linnk: "/invoicingguide  ",
    },
  ];

  const [menu, setMenu] = useState(false);

  return (
    <div className="relative">
      <div className="flex flex-row justify-between pr-8 pl-8 items-center pt-3 pb-3 shadow-sm ">
        <div className="flex flex-row gap-14 items-center">
          <img
            src={logo}
            alt=""
            width={200}
            className="hover:cursor-pointer h-16"
            onClick={() => navigate("/")}
          />
          <div className="hidden lg:flex flex-row gap-10 ">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="hover:cursor-pointer text-gray-600 hover:text-green-600"
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div className="lg:hidden">
          <button onClick={() => setMenu(!menu)}>
            {menu ? <RxCross2 /> : <RxHamburgerMenu />}
          </button>
          {menu && (
            <div className="flex flex-col absolute right-3 p-3 bg-gray-300 shadow-md rounded-lg">
              {menuItems.map((item, index) => (
                <div key={index}>{item.name}</div>
              ))}
            </div>
          )}
        </div>
        {/* <div className="hidden lg:flex flex-row gap-10">
          <button onClick={() => navigate("/login")}>Sign In</button>
          <button
            className="bg-[#20b27a] py-2 px-3 rounded-lg text-white"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default NavBar;
