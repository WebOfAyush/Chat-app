import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";

function ChatDetails({ user, setChatDetails }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    setIsVisible(true);
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleBack = () => {
    setIsVisible(false);
    setTimeout(() => setChatDetails(false), 300);
  };

  return (
    <div
      className={`p-4 absolute bg-tertiary h-screen w-screen md:w-1/4 right-0 text-white transform transition-transform duration-300 ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between">
        <h1 className="font-semibold">Chat Details</h1>
        <button onClick={handleBack}>
          <RxCross2 className="w-6 h-6" />
        </button>
      </div>
      <div className="mt-4 flex flex-col justify-center items-center text-center gap-3">
        <img
          src={user.profileImg ? user.profileImg : "/avatar-placeholder.png"}
          alt="profile"
          className="w-64 h-64 rounded-lg object-cover"
        />
        <h2 className="text-xl">{user.username}</h2>
        <h3 className="text-sm text-gray-400">{user.fullName}</h3>
        <h4 className="text-sm w-4/5 text-gray-400">{user.bio}</h4>
        <div className="flex items-center justify-center gap-2 text-blue-500">
          <FaExternalLinkAlt className="w-3 h-3" />
          <Link className="text-xs" to={user.link}>{user.link}</Link>
        </div>
      </div>
    </div>
  );
}

export default ChatDetails;
