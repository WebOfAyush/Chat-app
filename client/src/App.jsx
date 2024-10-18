import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import HomePage from "./pages/home/HomePage";
import { Toaster } from "react-hot-toast";

import { useAuthContext } from "./context/authContext";
import Sidebar from "./components/Sidebar";
import Requests from "./pages/request/Requests"
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="flex h-screen">
      <BrowserRouter>
      {authUser && <Sidebar />}
        <Routes>
          <Route
            path="/signup"
            element={!authUser ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/signup" />}
          />
          <Route
            path="/requests"
            element={authUser ? <Requests /> : <Navigate to="/signup" />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/signup" />}
          />
          <Route
            path="/profile/edit"
            element={authUser ? <EditProfile /> : <Navigate to="/signup" />}
          />
          
        </Routes>
      </BrowserRouter>
      <Toaster/>
    </div>
  );
}

export default App;
