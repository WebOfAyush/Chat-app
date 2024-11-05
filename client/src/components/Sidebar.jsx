import React from 'react';
import { Link } from 'react-router-dom';
import { IoChatbubble } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";




function Sidebar() {
  return (
    <div className="w-auto bg-tertiary h-screen flex flex-col p-4 text-white">
      <Link className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded" to="/">
        <IoChatbubble className='w-7 h-7'/>
      </Link>
      <Link className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded" to="/requests"><FaUserFriends className='w-7 h-7' /></Link>
      <Link className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded" to="/profile"><CgProfile className='w-7 h-7'/></Link>
    </div>
  );
}

export default Sidebar;
