import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-1/5 bg-tertiary h-screen flex flex-col p-4 text-white">
      <Link className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded" to="/">All Chats</Link>
      <Link className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded" to="/requests">Requests</Link>
      <Link className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded" to="/profile">Your Profile</Link>
    </div>
  );
}

export default Sidebar;
