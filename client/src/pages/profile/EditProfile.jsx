import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { updateUserProfile } from '../../api/userAPI';
import toast from 'react-hot-toast';

function EditProfile() {
  const authUser = JSON.parse(localStorage.getItem("chatx_user_data"));
  
  const [fullName, setFullName] = useState(authUser.fullName);
  const [email, setEmail] = useState(authUser.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [bio, setBio] = useState(authUser.bio);
  const [link, setLink] = useState(authUser.link);


  const {mutate:EditProfile, isPending, isError, error} = useMutation({
      mutationFn : (updateProfile)=> updateUserProfile(updateProfile),
      onSuccess:(data)=>{
        toast.success("Profile Updated")
          console.log(data)
          console.log("Profile Updated")
      },
      onError:(err)=>{
        console.log(err)
        // toast.error(err.message)
      }

  })
  const handleSave = () => {
    const profileData = {};
    if (fullName) profileData.fullName = fullName;
    if (email) profileData.email = email;
    if (currentPassword) profileData.currentPassword = currentPassword;
    if (newPassword) profileData.newPassword = newPassword;
    if (bio) profileData.bio = bio;
    if (link) profileData.link = link;
    EditProfile(profileData);
    
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

        <div className="flex flex-col space-y-4">
        {isError && <div className="text-red-500">{error.message || "An error occurred"}</div>}
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-2 bg-gray-700 rounded text-white"
            placeholder="Full Name"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 bg-gray-700 rounded text-white"
            placeholder="Email"
          />

          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="p-2 bg-gray-700 rounded text-white"
            placeholder="Current Password"
          />

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-2 bg-gray-700 rounded text-white"
            placeholder="New Password"
          />

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-2 bg-gray-700 rounded text-white"
            placeholder="Bio"
          />

          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="p-2 bg-gray-700 rounded text-white"
            placeholder="Link"
          />

          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
