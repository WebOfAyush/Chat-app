import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { updateProfileImg } from "../../api/userAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function Profile() {
  const authUser = JSON.parse(localStorage.getItem("chatx_user_data"));
  const navigate = useNavigate();
  const { fullName, username, bio, link, profileImg: initialProfileImg } = authUser;
  const [profileImg, setProfileImg] = useState(initialProfileImg || null);
  const profileImgRef = useRef(null);
  const queryClient = useQueryClient();

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a valid image (PNG or JPEG)");
        return;
      }
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
      const updatedUserData = { ...authUser, ...data };
      localStorage.setItem("chatx_user_data", JSON.stringify(updatedUserData));
    },
    onError: (err) => {
      toast.error("Failed to update profile: " + err.message);
    },
  });

  const handleProfileUpdate = () => {
    if (profileImg) {
      EditProfile({ profileImg });
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="w-full flex flex-col items-center justify-center bg-background  text-white">
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
              aria-label="Edit Profile Picture"
            >
              <MdEdit className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">{fullName}</h2>
        <h2 className="text-xl font mb-2 text-secondary">{username}</h2>
        <p className="text-gray-400 mb-4">{bio}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline mb-4"
        >
          {link}
        </a>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/profile/edit")}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primaryHover"
            aria-label="Edit Profile"
          >
            Edit Profile
          </button>
          {profileImg && 
            <button
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primaryHover"
              onClick={() => {
                handleProfileUpdate();
                setProfileImg(null);
              }}
              aria-label="Update Profile Picture"
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
