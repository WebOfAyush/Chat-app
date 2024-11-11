import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoChatbubble, IoChatbubbleOutline } from "react-icons/io5";
import { HiEnvelope, HiOutlineEnvelope } from "react-icons/hi2";
import { FaUser, FaRegUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/authAPI";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

function Sidebar() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const {setAuthUser} = useAuthContext();
  const navigate = useNavigate();
  const {mutate, isPending, isError, error} = useMutation({
    mutationFn:logout,
    onSuccess:()=>{
      localStorage.clear()
      setAuthUser(null)
      toast.success("You Logged Out")
      navigate("/signup")
    }
  })
  const handleLogoutModal = () => {
    setShowModal(true);
  };
  const handleLogout = () =>{
    mutate()
    
  }

  return (
    <div>
      {showModal && (
        <>
          <div className="absolute inset-0 bg-black opacity-50 z-20"></div>
          <div className="absolute h-screen w-screen z-30 flex justify-center items-center">
            <div className="shadow-2xl w-50 h-auto p-8 rounded-md text-white bg-background flex flex-col justify-center items-center gap-2 opacity-100">
              <p className="text-xl">You want to Logout?</p>
              <div className="flex gap-2">
                <button
                  className="bg-primary px-4 py-2 rounded-md hover:bg-primaryHover"
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
                <button onClick={handleLogout} className="bg-primary px-4 py-2 rounded-md hover:bg-primaryHover">
                  {isPending ? "Logging Out..." : "Yes"}
                </button >
              </div>
            </div>
          </div>
        </>
      )}

      <div className="bg-tertiary text-white flex md:flex-col md:fixed md:left-0 md:top-0 md:h-screen w-full md:w-auto p-2 md:p-3 justify-around md:justify-start fixed bottom-0 z-10 gap-4 md:content-center">
        <img
          src="/main-logo.png"
          alt="logo"
          className="w-12 mb-4 hidden md:block"
        />

        <Link
          className="cursor-pointer p-2 rounded flex justify-center md:justify-start"
          to="/"
        >
          {location.pathname === "/" || location.pathname.startsWith("/chat/") ? (
            <IoChatbubble className="w-7 h-7" />
          ) : (
            <IoChatbubbleOutline className="w-7 h-7" />
          )}
        </Link>

        <Link
          className="cursor-pointer p-2 rounded flex justify-center md:justify-start"
          to="/requests"
        >
          {location.pathname === "/requests" ? (
            <HiEnvelope className="w-7 h-7" />
          ) : (
            <HiOutlineEnvelope className="w-7 h-7" />
          )}
        </Link>

        <Link
          className="cursor-pointer p-2 rounded flex justify-center md:justify-start"
          to="/profile"
        >
          {location.pathname === "/profile" ? (
            <FaUser className="w-6 h-6" />
          ) : (
            <FaRegUser className="w-6 h-6" />
          )}
        </Link>

        <button
          onClick={handleLogoutModal}
          className="cursor-pointer p-2 rounded flex justify-center md:justify-start"
        >
          <BiLogOut className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
