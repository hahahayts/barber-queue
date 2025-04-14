import React from "react";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="bg-blue-800 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">💈</span>
          <h1 className="text-2xl font-bold">Barber Queue</h1>
        </div>
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
