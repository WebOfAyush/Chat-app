import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { searchUser } from "../../api/userAPI";
function ChatList() {
  const [showIncoming, setShowIncoming] = useState(false);
  const [query, setQuery] = useState(null);
  const toggleIncoming = () => {
    setShowIncoming(!showIncoming);
  };
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };
  const debouncedSearch = debounce(handleSearchChange, 300);
  const {
    data: searchResults,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["searchUser", query],
    queryFn: () => searchUser(query),
    enabled: !!query,
  });

  return (
    <div className="w-4/5 p-6 bg-gray-900 text-white">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded bg-gray-800 placeholder-gray-400 focus:outline-none"
          onChange={(e) => debouncedSearch(e)}
        />
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {error.message}</p>}
        {searchResults && searchResults.length > 0 ? (
          <ul className="bg-gray-800 p-4 flex-row  gap-2">
            {searchResults.map((user) => (
              <li key={user._id} className="bg-gray-700 flex justify-between gap-2 my-2 p-2">
                <div className="flex gap-2">

                <img
                  className="w-12 h-12"
                  src={
                    user.profileImg
                    ? user.profileImg
                    : "/avatar-placeholder.png"
                  }
                  alt="Profile Pic"
                  />
                <div>
                  <p>{user.username}</p>
                  {user.bio && <p>{user.bio}</p>}
                </div>
                  </div>

                <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                  Send Friend Request
                </button>
              </li>
            ))}
          </ul>
        ) : query && !isLoading ? (
          <p>No results found</p>
        ) : null}
      </div>
      <div className="bg-gray-700 p-4 rounded-md mb-4">
        <h3
          className="text-lg font-bold mb-4 cursor-pointer flex justify-between items-center"
          onClick={toggleIncoming}
        >
          Outgoing
          <span className="ml-2">{showIncoming ? "-" : "+"}</span>
        </h3>

        {showIncoming && (
          <div>
            <div className="flex justify-between items-center p-4 bg-gray-800 rounded mb-4">
              <div>
                <p className="font-bold">Berojgar</p>
                <p className="text-gray-400 text-sm">
                  Graduate from IIT Dholakpur
                </p>
              </div>
              <div>
                <p className="bg-red-500 text-white px-4 py-2 rounded">
                  Declined
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center p-4 bg-gray-800 rounded mb-4">
        <div className="flex w-16 h-16 gap-4 ">
          <img src="/avatar-placeholder.png" alt="" />
          <div>
            <p className="font-bold">Ganjedi</p>
            <p className="text-gray-400 text-sm whitespace-nowrap">
              Chle vadya marne
            </p>
          </div>
        </div>
        <div>
          <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">
            Accept
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
