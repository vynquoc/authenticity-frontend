import React from "react";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex justify-center items-center gap-2 bg-black text-gray-400 py-10 mt-5">
      <p>Created by</p>
      <div className="flex items-center">
        <FaLinkedin />
        <a
          href="https://www.linkedin.com/in/vy-nguyen-809b01228/"
          target="_blank"
          className="text-xs"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default Footer;
