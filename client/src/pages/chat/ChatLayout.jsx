import React, { useState } from 'react';
import FriendList from "./FriendList"
import MessageArea from './MessageArea';

export default function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState(null)
  return (
    <div className=" pt-4 h-screen w-screen md:ml-14 flex bg-background overflow-hidden rounded-l-3xl">
      <FriendList setSelectedUser={setSelectedUser} />
      <MessageArea selectedUser={selectedUser} />
    </div>
  );
}