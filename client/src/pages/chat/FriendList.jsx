import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserFriends } from "../../api/userAPI.js";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";
import Loader from "../../components/Loader.jsx";

export default function FriendList({ setSelectedUser, selectedUser }) {
  const { data, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });
  const navigate = useNavigate();
  const handleOnClick = (friend) => {
    setSelectedUser(friend);
    navigate(`/chat/${friend._id}`);
  };
  const handleNewChatClick = () => {
    navigate("/requests");
  };
  const { onlineUsers } = useSocketContext();
  const { authUser } = useAuthContext();

  return (
    
    <div
    className={`w-full md:w-80  px-8 h-screen bg-background md:border-r-8 md:border-r-tertiary ${
      selectedUser ? "hidden" : "block"
    } md:block`}
    >
      {isLoading && <Loader></Loader>}
      <button
        className="bg-primary px-4 py-2 w-full rounded-md text-white my-4"
        onClick={handleNewChatClick}
      >
        New Chat
      </button>

      <div className="no-scrollbar overflow-y-auto h-[calc(100vh-72px)] ">
        {data?.map((friend) => (
          <div
            key={friend._id}
            onClick={() => handleOnClick(friend)}
            className={`px-2 py-2 rounded-md mb-2 ${
              selectedUser?._id == friend._id && "bg-foreground"
            } hover:bg-foreground cursor-pointer transition-colors`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-gray-300 w-12 h-12 text-sm  ">
                    <img
                      src={
                        friend.profileImg
                          ? friend.profileImg
                          : "/avatar-placeholder.png"
                      }
                      className="w-12 object-cover h-12 rounded-lg"
                      alt="profile Img"
                    />
                    {onlineUsers.includes(friend._id) && (
                      <div className="rounded-full w-3 h-3 bg-green-500 absolute right-0 bottom-0"></div>
                    )}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h3 className="text-gray-200 text-medium font-medium truncate">
                    {friend.username}
                  </h3>
                </div>
                <div>
                  {friend.lastMessage ? (
                    <>
                      <p className="text-gray-400 text-sm truncate">
                        
                      </p>
                      <p className="text-gray-400 text-sm truncate">
                        {` ${friend.lastMessage.senderId === authUser._id
                          ? "Sent : "
                          : "Received : "} ${friend.lastMessage.message}`}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-400 text-sm truncate">
                      No messages yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
}
