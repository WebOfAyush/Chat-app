import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { sendMessage } from "../../api/messageAPI";
import toast from "react-hot-toast";
import { LuImagePlus } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";


function MessageInput({ receiverId, setMessages, messages }) {
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message.trim() || !receiverId) {
      return;
    }

    mutate({ receiverId, message, image:imagePreview });
    setImagePreview(null)
    setMessage("");
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const { mutate, isPending: sendingMessage } = useMutation({
    mutationFn: ({ receiverId, message, image }) =>
      sendMessage({ receiverId, message, image }),
    onSuccess: (newMessage) => {
      setMessages([...messages, newMessage]);
      queryClient.invalidateQueries("friends");
    },
    onError: (error) => {
      console.error("Failed to send message:", error.message || error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    },
  });
  return (
    <div>
        {imagePreview && (
          <div className="mb-3 flex items-center gap-2">
            <div className="absolute ml-14 mb-20 z-10">
              <img
                src={imagePreview}
                alt="Preview"
                className=" w-20 h-20 object-cover rounded-lg border border-zinc-700"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                type="button"
              >
                <RxCross2 className="w-7 h-7" />
              </button>
            </div>
          </div>
        )}
      <div className="flex items-center mb-20 md:mb-0 bg-background space-x-2 mx-4">
        <form onSubmit={handleSendMessage} className="flex justify-center items-center flex-grow">
          
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={` flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <LuImagePlus className="w-7 h-7 mr-2" />
          </button>
          <input
            type="text"
            placeholder="Your message"
            className="flex-1 bg-foreground w-full text-gray-200 px-4 py-2 shadow-lg rounded-md rounded-r-none focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary rounded-md rounded-l-none text-white"
          >
            {sendingMessage ? "Sending" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MessageInput;
