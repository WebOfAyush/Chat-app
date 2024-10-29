import React from 'react';
import FriendList from "./FriendList"
import Chat from './Chat';

export default function ChatLayout() {
  return (
    <div className="h-screen w-screen flex bg-[#1e2124]">
      <FriendList />
      <Chat />
    </div>
  );
}