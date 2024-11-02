import React from 'react'
import { FaFacebook, FaTwitter } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-2 bg-[#333] h-[80px] text-white px-10">
      <div>
        <h1 className="text-2xl font-semibold">Shiritori・英語しりとり</h1>
      </div>
      <div className="flex gap-5 items-center">
        <span className="pr-5 border-r-2">Share</span>
        <FaFacebook />
        <FaTwitter />
      </div>
    </div>
  );
}

export default Navbar