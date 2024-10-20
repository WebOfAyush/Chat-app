import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import {
  getIncommingRequest,
  getOutgoingRequest,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
} from "../../api/friendRequestAPI";
import { searchUser } from "../../api/userAPI";
import toast from "react-hot-toast";
function ChatList() {
  const [ShowOutgoing, setShowOutgoing] = useState(false);
  const [query, setQuery] = useState(null);
  const queryClient = useQueryClient();
  const toggleOutgoing = () => {
    setShowOutgoing(!ShowOutgoing);
  };
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };
  const handleAcceptRequest = (requestId) => {
    acceptFriendRequests(requestId);
  };
  const handleDeclineRequest = (requestId) => {
    declineFriendRequests(requestId);
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

  const { mutate: sendRequest, isPending: isSendingFriendRequest } =
    useMutation({
      mutationFn: sendFriendRequest,
      onSuccess: () => {
        queryClient.invalidateQueries("searchUser");
        toast.success("Sent Friend Request");
      },
      onError: (err) => {
        toast.error(err.message || "Something went wrong");
      },
    });
  const { data: outgoingRequests, isLoading: isLoadingOutgoingRequests } =
    useQuery({
      queryKey: ["outgoingRequests"],
      queryFn: () => getOutgoingRequest(),
      enabled: ShowOutgoing,
    });
  const { data: IncommingRequests, isLoading: isLoadingIncommingRequests } =
    useQuery({
      queryKey: ["IncommingRequests"],
      queryFn: () => getIncommingRequest(),
    });
  const { mutate: acceptFriendRequests, isPending: isAccepting } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: (data) => {
      toast.success("See them in chat now");
      console.log(data.message);
      queryClient.invalidateQueries("outgoingRequests")
    },
    onError:(err)=>{
      toast.error(err.message || "Something went wrong")
    }
  });
  const { mutate: declineFriendRequests, isPending: isDeclining } = useMutation({
    mutationFn: declineFriendRequest,
    onSuccess: (data) => {
      toast.success("You rejected the request");
      console.log(data.message);
      queryClient.invalidateQueries("outgoingRequests")
    },
    onError:(err)=>{
      toast.error(err.message || "Something went wrong")
    }
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
              <li
                key={user._id}
                className="bg-gray-700 flex justify-between gap-2 my-2 p-2"
              >
                <div className="flex gap-2">
                  <img
                    className="w-12 h-12 object-cover"
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

                <button
                  onClick={() => sendRequest(user._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  {isSendingFriendRequest ? "Sending" : "Send Friend Request"}
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
          onClick={toggleOutgoing}
        >
          Outgoing
          <span className="ml-2">{ShowOutgoing ? "-" : "+"}</span>
        </h3>

        {isLoadingOutgoingRequests
          ? "Loading..."
          : outgoingRequests &&
            outgoingRequests.length > 0 && (
              <ul>
                {outgoingRequests.map((request) => (
                  <li key={request._id}>
                    <div className="flex justify-between items-center p-4 bg-gray-800 rounded mb-4">
                      <div className="flex w-16 h-16 gap-4">
                        <img
                          className="object-cover"
                          src={
                            request.to.profileImg
                              ? request.to.profileImg
                              : "/avatar-placeholder.png"
                          }
                          alt={`${request.to.username}'s profile`}
                        />
                        <div>
                          <p className="font-bold">{request.to.username}</p>
                          <p className="text-gray-400 text-sm whitespace-nowrap">
                            {request.to.bio}
                          </p>
                        </div>
                      </div>
                      <div>
                        <button className="bg-red-500 text-white px-4 py-2 rounded">
                          {request.status}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
      </div>

      <div className="bg-gray-700 p-4 rounded-md mb-4">
        <h3 className="text-lg font-bold mb-4">Incoming</h3>
        {isLoadingIncommingRequests
          ? "Loading..."
          : IncommingRequests &&
            IncommingRequests.length > 0 && (
              <ul>
                {IncommingRequests.map((request) => (
                  <li key={request._id}>
                    <div className="flex justify-between items-center p-4 bg-gray-800 rounded mb-4">
                      <div className="flex w-16 h-16 gap-4">
                        <img
                          className="object-cover"
                          src={
                            request.from.profileImg
                              ? request.from.profileImg
                              : "/avatar-placeholder.png"
                          }
                          alt={`${request.from.username}'s profile`}
                        />
                        <div>
                          <p className="font-bold">{request.from.username}</p>
                          <p className="text-gray-400 text-sm whitespace-nowrap">
                            {request.from.bio}
                          </p>
                        </div>
                      </div>
                      <div>
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                          onClick={() => handleAcceptRequest(request._id)}
                        >
                          {isAccepting ? "Accepting" : "Accept"}
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDeclineRequest(request._id)}>
                          {isDeclining? "Declining" : "Decline"}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
      </div>
    </div>
  );
}

export default ChatList;
