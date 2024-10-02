import React from "react";

import { useNavigate } from "react-router-dom";
// import Form from "../components/Form";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[url('https://i.pinimg.com/originals/d8/a8/8a/d8a88a6f7d22cbb3e0fcf50ba9c1de95.jpg')] bg-cover h-screen px-10 py-10">
      <div className="flex gap-10">
        <div
          className="bg-slate-600 bg-opacity-70 h-40 w-64 flex justify-center items-center rounded-3xl text-white hover:cursor-pointer hover:bg-opacity-90 transition-all duration-300"
          onClick={() => navigate("/Form")}
        >
          Create New Order
        </div>

        {/* Button 1  */}
        <div className="bg-yellow-950 h-40 w-64 flex justify-center items-center rounded-3xl text-white hover:cursor-pointer">
          Edit
        </div>
        {/* Button 2  */}
        <div className="bg-blue-950 h-40 w-64 flex justify-center items-center rounded-3xl text-white hover:cursor-pointer">
          Update
        </div>
        {/* button 3  */}
      </div>
      {/* A Complete Row for Buttons  */}
      <div className="flex gap-10 mt-10">
        <div className="bg-slate-600 h-40 w-64 flex justify-center items-center rounded-3xl text-white hover:cursor-pointer">
          Create New Order
        </div>
        {/* Button 1  */}
        <div className="bg-yellow-950 h-40 w-64 flex justify-center items-center rounded-3xl text-white hover:cursor-pointer">
          Edit
        </div>
        {/* Button 2  */}
        <div className="bg-blue-950 h-40 w-64 flex justify-center items-center rounded-3xl text-white hover:cursor-pointer">
          Update
        </div>
        {/* button 3  */}
      </div>
      {/* 2nd Row of Buttons  */}
    </div>
  );
};

export default Home;
