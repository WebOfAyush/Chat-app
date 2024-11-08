import React, { useState } from 'react';
import FriendList from "./FriendList"
import MessageArea from './MessageArea';

export default function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState(null)
  return (
    <div className="no-scrollbar h-screen w-screen md:ml-14 flex bg-background overflow-hidden ">
      <FriendList setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
      <MessageArea selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
    </div>
  );
}