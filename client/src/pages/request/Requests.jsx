import React, { useState } from 'react';

function ChatList() {
  // State to toggle visibility of incoming requests
  const [showIncoming, setShowIncoming] = useState(false);

  // Toggle function
  const toggleIncoming = () => {
    setShowIncoming(!showIncoming);
  };

  return (
    <div className="w-4/5 p-6 bg-gray-900 text-white">
      {/* Search Bar */}
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full p-2 rounded bg-gray-800 placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Incoming Requests Section */}
      <div>
        {/* Toggle Button for Incoming Requests */}
        <h3 
          className="text-lg font-bold mb-4 cursor-pointer flex justify-between items-center" 
          onClick={toggleIncoming}
        >
          Incoming
          <span className="ml-2">{showIncoming ? '-' : '+'}</span>
        </h3>

        {/* Conditionally show requests based on toggle state */}
        {showIncoming && (
          <div>
            {/* Request Item */}
            <div className="flex justify-between items-center p-4 bg-gray-800 rounded mb-4">
              <div>
                <p className="font-bold">Berojgar</p>
                <p className="text-gray-400 text-sm">Graduate from IIT Dholakpur</p>
              </div>
              <div>
                <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">Accept</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Decline</button>
              </div>
            </div>

            {/* Repeat other requests */}
            <div className="flex justify-between items-center p-4 bg-gray-800 rounded mb-4">
              <div>
                <p className="font-bold">Ganjedi</p>
                <p className="text-gray-400 text-sm">Chle vadya marne</p>
              </div>
              <div>
                <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">Accept</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Decline</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatList;
