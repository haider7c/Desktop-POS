import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import bg2 from "../assets/bg2.png";
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
// import Form from "../components/Form";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      <div
        style={{
          backgroundImage: `url(${bg2})`,
          backgroundSize: "cover", // Adjust this based on how you want the image to behave
          // backgroundPosition: "center", // Centers the image
          height: "720px", // Set a height for the div
          width: "100%", // Optional width
        }}
        className="bg-cover h-screen flex flex-col items-center text-center"
      >
        <div className="my-5">
          <h1 className="text-white text-5xl font-bold">
            Streamline Your Rice
          </h1>
          <h1 className="text-white text-5xl font-bold">Orders With Ease</h1>
        </div>
        <div className="flex gap-10">
          <div
            style={{
              backgroundImage: `url(${card1})`,
              backgroundSize: "cover", // Adjust this based on how you want the image to behave
              // backgroundPosition: "center", // Centers the image
              height: "250px", // Set a height for the div
              width: "250px", // Optional width
            }}
            className="hover:cursor-pointer"
            onClick={() => navigate("/form")}
          >
            <div className="flex flex-col items-start ml-5 mt-5">
              <div className="bg-white px-2 py-1 rounded-sm shadow-md">+</div>
              <h1 className="text-2xl max-w-32 text-left font-bold mt-8">
                Create New Order
              </h1>
              <p className="mt-12 text-sm text-white">
                Start a new order instantly
              </p>
            </div>
          </div>
          {/* Button 1  */}
          <div
            style={{
              backgroundImage: `url(${card2})`,
              backgroundSize: "cover", // Adjust this based on how you want the image to behave
              // backgroundPosition: "center", // Centers the image
              height: "250px", // Set a height for the div
              width: "250px", // Optional width
            }}
            className="hover:cursor-pointer"
          >
            {" "}
            <div className="flex flex-col items-start ml-5 mt-5">
              <div className="bg-white px-2 py-1 rounded-sm shadow-md">+</div>
              <h1 className="text-2xl max-w-32 text-left font-bold mt-8">
                Manage Orders
              </h1>
              <p className="mt-12 text-sm">Manage all Orders edit</p>
            </div>
          </div>
          {/* Button 2  */}
          <div
            style={{
              backgroundImage: `url(${card2})`,
              backgroundSize: "cover", // Adjust this based on how you want the image to behave
              // backgroundPosition: "center", // Centers the image
              height: "250px", // Set a height for the div
              width: "250px", // Optional width
            }}
            className="hover:cursor-pointer"
          >
            {" "}
            <div className="flex flex-col items-start ml-5 mt-5">
              <div className="bg-white px-2 py-1 rounded-sm shadow-md">+</div>
              <h1 className="text-2xl max-w-32 text-left font-bold mt-8">
                Manage Orders
              </h1>
              <p className="mt-12 text-sm">Manage all Orders edit</p>
            </div>
          </div>
          {/* button 3  */}
        </div>
        {/* A Complete Row for Buttons  */}
        <div className="flex gap-10 mt-10">
          <div
            style={{
              backgroundImage: `url(${card2})`,
              backgroundSize: "cover", // Adjust this based on how you want the image to behave
              // backgroundPosition: "center", // Centers the image
              height: "250px", // Set a height for the div
              width: "250px", // Optional width
            }}
            className="hover:cursor-pointer"
          >
            {" "}
            <div className="flex flex-col items-start ml-5 mt-5">
              <div className="bg-white px-2 py-1 rounded-sm shadow-md">+</div>
              <h1 className="text-2xl max-w-32 text-left font-bold mt-8">
                Manage Orders
              </h1>
              <p className="mt-12 text-sm">Manage all Orders edit</p>
            </div>
          </div>
          {/* Button 1  */}
          <div
            style={{
              backgroundImage: `url(${card2})`,
              backgroundSize: "cover", // Adjust this based on how you want the image to behave
              // backgroundPosition: "center", // Centers the image
              height: "250px", // Set a height for the div
              width: "250px", // Optional width
            }}
            className="hover:cursor-pointer"
          >
            {" "}
            <div className="flex flex-col items-start ml-5 mt-5">
              <div className="bg-white px-2 py-1 rounded-sm shadow-md">+</div>
              <h1 className="text-2xl max-w-32 text-left font-bold mt-8">
                Manage Orders
              </h1>
              <p className="mt-12 text-sm">Manage all Orders edit</p>
            </div>
          </div>
          {/* Button 2  */}
          <div
            style={{
              backgroundImage: `url(${card2})`,
              backgroundSize: "cover", // Adjust this based on how you want the image to behave
              // backgroundPosition: "center", // Centers the image
              height: "250px", // Set a height for the div
              width: "250px", // Optional width
            }}
            className="hover:cursor-pointer"
          >
            {" "}
            <div className="flex flex-col items-start ml-5 mt-5">
              <div className="bg-white px-2 py-1 rounded-sm shadow-md">+</div>
              <h1 className="text-2xl max-w-32 text-left font-bold mt-8">
                Manage Orders
              </h1>
              <p className="mt-12 text-sm">Manage all Orders edit</p>
            </div>
          </div>
          {/* button 3  */}
        </div>
        {/* 2nd Row of Buttons  */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
