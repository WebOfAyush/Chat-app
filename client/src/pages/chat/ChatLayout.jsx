import React, { useState } from 'react';
import FriendList from "./FriendList"
import MessageArea from './MessageArea';

export default function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState(null)
  return (
    <div className="h-screen w-screen flex bg-[#1e2124]">
      <FriendList setSelectedUser={setSelectedUser} />
      <MessageArea selectedUser={selectedUser} />
    </div>
  );
}