import React, { useState } from "react";

function ChatList() {
  const [showIncoming, setShowIncoming] = useState(false);

  // Toggle function
  const toggleIncoming = () => {
    setShowIncoming(!showIncoming);
  };

  return (
    <div className="w-4/5 p-6 bg-gray-900 text-white">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded bg-gray-800 placeholder-gray-400 focus:outline-none"
        />
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
        <div>
          <p className="font-bold">Ganjedi</p>
          <p className="text-gray-400 text-sm">Chle vadya marne</p>
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
