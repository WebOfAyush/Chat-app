import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getUserFriends } from '../../api/userAPI.js';


const chats = [
  { id: 1, name: 'Berojgaar', message: 'Job mili kya bhai ?', time: '2m', isOnline: true },
  { id: 2, name: 'Ganjedi', message: 'Chle vediya marne', time: '5m', isOnline: false },
  { id: 3, name: 'User', message: 'linkedin kese pr...', time: '10m', isOnline: true },
  { id: 4, name: 'Ganjedi', message: 'Chle vediya marne', time: '15m', isOnline: false },
  { id: 5, name: 'User', message: 'unblock krde plz...', time: '20m', isOnline: true },
];


export default function Sidebar() {
  const {data, isLoading, isError, error} = useQuery({
    queryKey:["friends"],
    queryFn:getUserFriends,
  }
  )
  return (
    <div className="w-80 bg-[#2b2d31] border-r border-[#1e1f22]">
      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <input className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="search"
            className="w-full bg-[#1e1f22] text-gray-200 pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="overflow-y-auto h-[calc(100vh-72px)]">
      {data?.map((friend) => (
          <div
            key={friend._id}
            className="px-4 py-3 hover:bg-[#35373c] cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-[#35373c] rounded-full flex items-center justify-center">
                  <span className="text-gray-300 text-sm">
                    {friend.username[0].toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h3 className="text-gray-200 text-sm font-medium truncate">{friend.username}</h3>
                </div>
                <p className="text-gray-400 text-sm truncate">{friend.bio || "No bio available"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}