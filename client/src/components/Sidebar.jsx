import React from 'react';
import { Link } from 'react-router-dom';
import { IoChatbubble } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

function Sidebar() {
  return (
    <div className="bg-tertiary text-white flex md:flex-col md:fixed md:left-0 md:top-0 md:h-screen w-full md:w-auto p-2 md:p-3 justify-around md:justify-start fixed bottom-0 z-10 gap-4 md:content-center ">
      <img src="/main-logo.png " alt="logo" className='w-12 mb-4 hidden md:block'/>
      <Link className="cursor-pointer hover:bg-gray-700 p-2 rounded flex justify-center md:justify-start" to="/">
        <IoChatbubble className="w-7 h-7" />
      </Link>
      <Link className="cursor-pointer hover:bg-gray-700 p-2 rounded flex justify-center md:justify-start" to="/requests">
        <FaUserFriends className="w-7 h-7" />
      </Link>
      <Link className="cursor-pointer hover:bg-gray-700 p-2 rounded flex justify-center md:justify-start" to="/profile">
        <CgProfile className="w-7 h-7" />
      </Link>
    </div>
  );
}

export default Sidebar; 