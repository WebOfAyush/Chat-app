import React, { useEffect, useRef, useState } from "react";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages, sendMessage } from "../../api/messageAPI";
import { useSocketContext } from "../../context/SocketContext";
import { timeAgo } from "../../lib/timeAgo";
import { format } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import ChatDetails from "../../components/ChatDetails";
import Loader from "../../components/Loader";


export default function MessageArea({selectedUser ,setSelectedUser}) {
  // const messagesRef = useRef(null);
  const navigate = useNavigate();
  const {onlineUsers} = useSocketContext()
  const [message, setMessage] = useState("");
  const [chatDetails, setChatDetails] = useState(false)
  const queryClient = useQueryClient();
  const { chatId: receiverId } = useParams();
  const { socket } = useSocketContext();
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message.trim() || !receiverId) {
      return;
    }

    mutate({ receiverId, message });
    setMessage("");
  };

  const { mutate, isPending: sendingMessage } = useMutation({
    mutationFn: ({ receiverId, message }) =>
      sendMessage({ receiverId, message }),
    onSuccess: (newMessage) => {
      setMessages([...messages, newMessage]);
      queryClient.invalidateQueries("friends")
    },
    onError: (error) => {
      console.error("Failed to send message:", error.message || error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    },
  });

  const { data: conversation = {}, isLoading: isLoadingMessages } = useQuery(
    {
      queryKey: ["messages", receiverId],
      queryFn: () => getMessages(receiverId),
      enabled: !!receiverId,
    }
  );
  const handleBackClick = () =>{
    navigate("/")
    setSelectedUser(null)
  }
  const handleChatDetailsClick = () => {
    setChatDetails(!chatDetails)
  }
  const [messages, setMessages] = useState(conversation.messages || []);
  useEffect(() => {
    if (receiverId) {
      setMessages(conversation.messages);
    }
  }, [conversation.messages, receiverId]);

  // useEffect(() => {
  //   if (messagesRef.current) {
  //     messagesRef.current.scrollIntoView();
  //   }
  // }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        queryClient.invalidateQueries("friends")
      });
    }

    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket, messages]);
  useEffect(() => {
    const container = document.querySelector(".messages-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const groupedMessages = (messages || []).reduce((acc, message) => {
    const messageDate = format(new Date(message.createdAt), "yyyy-MM-dd");
    if (!acc[messageDate]) {
      acc[messageDate] = [];
    }
    acc[messageDate].push(message);
    return acc;
  }, {});

  const getUserInfo = (userId) => {
    const user = conversation?.participants?.find((participant) => participant._id === userId);
    return user || {};
  };

  return (
    <div className={`no-scrollbar overflow-hidden flex-1 flex flex-col bg-background ${selectedUser ? "block" : "hidden"} md:block`}>
        {isLoadingMessages && <Loader/> }
      {receiverId ? (
        <>
          {/* Chat Header */}
          {chatDetails && <ChatDetails user={getUserInfo(receiverId) } setChatDetails={setChatDetails}/>}
          <div className="h-14 bg-tertiary flex items-center justify-between px-4">
            <div className="flex items-center space-x-3">
              <button onClick={handleBackClick} className="block md:hidden">

                <IoMdArrowRoundBack className="w-6 h-6 text-white"/>
              </button>
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                {/* Assuming receiverId is one of the participants */}
                <img
                  src={getUserInfo(receiverId)?.profileImg || "/avatar-placeholder.png"}
                  className="w-10 h-10 rounded-lg object-cover" 
                  alt="profile Img"
                />
              </div>
              <div>
                <h3 className="text-gray-200 font-bold">
                  {getUserInfo(receiverId)?.username}
                </h3>
                <p className="text-xs text-gray-400">{onlineUsers.includes(receiverId) ? "Online" : "Offline"}</p>
                
              </div>
            </div>
            <button className="text-gray-400 hover:text-white">
            <MdMoreHoriz className="w-7 h-7" onClick={handleChatDetailsClick}/>
            </button>
          </div>
        
          {/* Messages */}
          <div className="messages-container flex-1 no-scrollbar overflow-y-auto p-4 space-y-4 h-[calc(100%-115px)]">
            {Object.keys(groupedMessages).map((date) => (
              <div key={date}>
                {/* Date Header */}
                <div className="text-center text-gray-400 text-xs my-2">
                  {format(new Date(date), "MMMM dd, yyyy")}
                </div>
                {groupedMessages[date].map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${
                      msg.receiverId === receiverId ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 my-1 shadow-lg font-light ${
                        msg.receiverId === receiverId
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-foreground text-gray-200 rounded-tl-none"
                      }`}
                    >
                      <p>{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            {/* <div ref={messagesRef} /> */}
          </div>

          {/* Message Input */}
          <div>
            <div className="flex items-center mb-20 md:mb-0 bg-background space-x-2 mx-4">
              <form onSubmit={handleSendMessage} className="flex flex-grow">
                <input
                  type="text"
                  placeholder="Your message"
                  className="flex-1 bg-foreground w-full text-gray-200 px-4 py-2 shadow-lg rounded-md rounded-r-none focus:outline-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary rounded-md rounded-l-none text-white"
                >
                  {sendingMessage ? "Sending" : "Send"}
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 h-full flex items-center justify-center text-center text-gray-400 p-4">
          <div>
            <h2 className="text-2xl font-semibold mb-4">No User Selected</h2>
            <p className="text-lg">Please select a user to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
}
