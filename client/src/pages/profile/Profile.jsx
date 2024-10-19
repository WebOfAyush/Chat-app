import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { updateProfileImg } from "../../api/userAPI";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function Profile() {
  const authUser = JSON.parse(localStorage.getItem("chatx_user_data"));
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(authUser.profileImg || null);
  const profileImgRef = useRef(null);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const { mutate: EditProfile, isLoading } = useMutation({
    mutationFn: (updateProfile) => updateProfileImg(updateProfile),
    onSuccess: (data) => {
      toast.success("Profile Updated");
      const updatedUserData = {
        ...authUser,
        ...data,
      };
      localStorage.setItem("chatx_user_data", JSON.stringify(updatedUserData));
    },
    onError: (err) => {
      toast.error("Failed to update profile: " + err.message);
    },
  });

  const handleProfileUpdate = () => {
    const profileData = {};
    if (profileImg) profileData.profileImg = profileImg
    EditProfile(profileData);
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="w-full flex flex-col items-center justify-center bg-gray-900 text-white">
        <input
          type="file"
          hidden
          accept="image/png, image/jpeg"
          ref={profileImgRef}
          onChange={handleImgChange}
        />

        <div className="mb-2">
          <div className="w-32 rounded-full relative group/avatar">
            <img
              src={profileImg || "/avatar-placeholder.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <div
              className="absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer"
              onClick={() => profileImgRef.current.click()}
            >
              <MdEdit className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">{authUser.fullName}</h2>
        <h2 className="text-xl font mb-2 text-secondary">
          {authUser.username}
        </h2>
        <p className="text-gray-400 mb-4">{authUser.bio}</p>
        <a
          href={authUser.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline mb-4"
        >
          {authUser.link}
        </a>
        <div className="flex gap-2">
          
        <button
          onClick={()=>navigate("/profile/edit")}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          
          >
          Edit Profile
        </button>
        {profileImg && 
        <button
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        onClick={ () => {
          handleProfileUpdate();
          setProfileImg(null);
        }}
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
        }
        </div>
      </div>
    </div>
  );
}

export default Profile;
