import React from "react";

const Navbar = () => {
  return (
    // <nav className="flex justify-around bg-indigo-700 text-white py-3">
    <nav className="flex justify-around bg-[#1a1a1a] text-[#8e2de2] py-3 font-semibold">
      <div className="logo">
        <span className="font-bold text-xl mx-8">SynTask</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer hover:font-bold transition-all">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
      </ul>
    </nav>
  );
};

export default Navbar;
