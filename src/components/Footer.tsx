import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#333] p-4 text-sm text-white">
      <div className="container mx-auto flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-5">
          <a href="#">Help</a>
          <a href="#">About</a>
          <a href="#">Feedback</a>
          <a href="#">Privacy</a>
          <a href="#">日本語</a>
        </div>
        <div>By Kyoto Games. Copyright 2018 by Andy Pickering.</div>
      </div>
    </footer>
  );
};

export default Footer;
