import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const authUser = JSON.parse(localStorage.getItem("chatx_user_data"));
  const navigate = useNavigate(); 

  return (
    <div className="flex h-screen w-screen">
      <div className="w-full flex flex-col items-center justify-center bg-gray-900 text-white ">
        <img className="w-32 h-32 bg-gray-300 rounded-full mb-4" src={authUser.profileImg} alt="Profile" />
        <h2 className="text-2xl font-bold mb-2">{authUser.fullName}</h2>
        <h2 className="text-xl font mb-2 text-secondary">{authUser.username}</h2>
        <p className="text-gray-400 mb-4">{authUser.bio}</p>
        <a href={authUser.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline mb-4">
          {authUser.link}
        </a>
        <button
          onClick={() => navigate('/profile/edit')} 
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
