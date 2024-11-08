import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoChatbubble, IoChatbubbleOutline } from "react-icons/io5";
import { HiEnvelope, HiOutlineEnvelope } from "react-icons/hi2";
import { FaUser , FaRegUser } from "react-icons/fa";

function Sidebar() {
  const location = useLocation(); // Get the current location

  return (
    <div className="bg-tertiary text-white flex md:flex-col md:fixed md:left-0 md:top-0 md:h-screen w-full md:w-auto p-2 md:p-3 justify-around md:justify-start fixed bottom-0 z-10 gap-4 md:content-center">
      <img src="/main-logo.png" alt="logo" className='w-12 mb-4 hidden md:block' />
      
      <Link className="cursor-pointer   p-2 rounded flex justify-center md:justify-start" to="/">
        {location.pathname === "/" || location.pathname.startsWith("/chat/") ? <IoChatbubble className="w-7 h-7" /> : <IoChatbubbleOutline className="w-7 h-7" />}
      </Link>
      
      <Link className="cursor-pointer   p-2 rounded flex justify-center md:justify-start" to="/requests">
        {location.pathname === "/requests" ? <HiEnvelope className="w-7 h-7" /> : <HiOutlineEnvelope className="w-7 h-7" />}
      </Link>
      
      <Link className="cursor-pointer   p-2 rounded flex justify-center md:justify-start" to="/profile">
      {location.pathname === "/profile" ? <FaUser className="w-6 h-6"/> : <FaRegUser className="w-6 h-6"/>}
      </Link>
    </div>
  );
}

export default Sidebar;
