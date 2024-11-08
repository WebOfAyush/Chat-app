import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserFriends } from "../../api/userAPI.js";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";



export default function FriendList({ setSelectedUser, selectedUser }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });
  const navigate = useNavigate();
  const handleOnClick = (friend)=>{
    setSelectedUser(friend)
    navigate(`/chat/${friend._id}`)
  }
  return (
    <div className={`w-full md:w-80  px-8 h-screen bg-background md:border-r-8 md:border-r-tertiary ${selectedUser ? "hidden" : "block"} md:block`}>
      <div className="py-4 ">
        <div className="relative">
          <div className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" >
                <IoSearchSharp/>
          </div>
          <input
            type="text"
            placeholder="search"
            className="w-full shadow-md bg-foreground text-gray-200 pl-10 pr-4 py-3 rounded-lg text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className=" overflow-y-auto h-[calc(100vh-72px)] ">
        {data?.map((friend) => (
          <div
            key={friend._id}
            onClick={()=>handleOnClick(friend) }
            className="px-2 py-2 rounded-md mb-2 hover:bg-foreground cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-gray-300 text-sm  ">
                    <img
                      src={friend.profileImg ? friend.profileImg : "/avatar-placeholder.png"}
                      className="object-cover rounded-lg"
                      alt="profile Img"
                    />
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h3 className="text-gray-200 text-medium font-medium truncate">
                    {friend.username}
                  </h3>
                </div>
                {friend.bio && <p className="text-gray-400 text-sm truncate">{friend.bio}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
