import React from "react";
import { useState } from "react";

const messages = [
  {
    id: 1,
    sender: "Berojgaar",
    content: "Job mili kya bhai ?",
    time: "Today",
    type: "received",
  },
  {
    id: 2,
    sender: "You",
    content: "try kr rha hu yaar linkedin vgera pr",
    time: "Today",
    type: "sent",
  },
  {
    id: 3,
    sender: "You",
    content: "Apply kra 2-3 company pr",
    time: "Today",
    type: "sent",
  },
]; 



export default function MessageArea({ selectedUser }) {
  const [message, setMessage] = useState(null)
  const handleSendMessage = (e) =>{
    e.preventDefault()
    // send message or kya
  }
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
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "sent" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.type === "sent"
                      ? "bg-[#4752c4] text-white"
                      : "bg-[#383a40] text-gray-200"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs mt-1 opacity-60">{message.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 w-full">
            <div className="flex items-center space-x-2 ">
              <button className="text-gray-400 hover:text-gray-200 p-2">
                {/* ImagePlus icon here */}
              </button>
              <form onSubmit={handleSendMessage} className="flex flex-grow">
                <input
                  type="text"
                  placeholder="Your message"
                  className="flex-1 bg-[#383a40] w-full text-gray-200 px-4 py-2 rounded-md focus:outline-none"
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}
                />
                <button type="submit" className="px-4 py-2 bg-primary text-white">Send</button>
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
