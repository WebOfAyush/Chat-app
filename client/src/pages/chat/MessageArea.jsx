import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMessages, sendMessage } from "../../api/messageAPI";
import { useSocketContext } from "../../context/SocketContext";
import { timeAgo } from "../../lib/timeAgo";
import { format } from "date-fns";

export default function MessageArea({ selectedUser }) {
  const messagesRef = useRef(null);
  const [message, setMessage] = useState("");
  const receiverId = selectedUser?._id || null;
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
    },
    onError: (error) => {
      console.error("Failed to send message:", error.message || error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    },
  });
  const { data: initialMessages = [], isLoading: isLoadingMessages } = useQuery(
    {
      queryKey: ["messages", receiverId],
      queryFn: () => getMessages(receiverId),
      enabled: !!receiverId,
    }
  );
  const [messages, setMessages] = useState(initialMessages);
  useEffect(() => {
    if (receiverId) {
      setMessages(initialMessages);
    }
  }, [initialMessages, receiverId]);
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView();
    }
  }, [messages]);
  useEffect(() => {

    if (socket) {
      socket.on("newMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }

    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket, messages]);

  const groupedMessages = messages.reduce((acc, message) => {
    const messageDate = format(new Date(message.createdAt), "yyyy-MM-dd");
    if (!acc[messageDate]) {
      acc[messageDate] = [];
    }
    acc[messageDate].push(message);
    return acc;
  }, {});
  return (
    <div className="flex-1 flex flex-col bg-[#313338]">
      {selectedUser ? (
        <>
          {/* Chat Header */}
          <div className="h-14 border-b border-[#1e1f22] flex items-center justify-between px-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#35373c] rounded-full flex items-center justify-center">
                <span className="text-gray-300 text-sm">
                  {selectedUser.username[0].toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-gray-200 font-medium">
                  {selectedUser.username}
                </h3>
                <p className="text-xs text-gray-400">Online</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-200"></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                      msg.receiverId === receiverId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 my-1 ${
                        msg.receiverId === receiverId
                          ? "bg-[#4752c4] text-white"
                          : "bg-[#383a40] text-gray-200"
                      }`}
                    >
                      <p>{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div ref={messagesRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 w-full">
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-gray-200 p-2">
                {/* ImagePlus icon here */}
              </button>
              <form onSubmit={handleSendMessage} className="flex flex-grow">
                <input
                  type="text"
                  placeholder="Your message"
                  className="flex-1 bg-[#383a40] w-full text-gray-200 px-4 py-2 rounded-md focus:outline-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white"
                >
                  {sendingMessage ? "Sending" : "Send"}
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-center text-gray-400 p-4">
          <div>
            <h2 className="text-2xl font-semibold mb-4">No User Selected</h2>
            <p className="text-lg">Please select a user to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
}
