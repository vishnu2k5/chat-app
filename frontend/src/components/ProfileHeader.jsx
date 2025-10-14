import React from "react";
import { useRef, useState } from "react";
import { userChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";


const mouseClickSound = new Audio("/sounds/mouse-click.mp3")
const ProfileHeader = () => {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = userChatStore();
  const [profilePic, setProfilePic] = useState(null); 
  const fileInputRef = useRef(null);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setProfilePic(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };
  const onclickHandle = () => {
    console.log(fileInputRef.current);
    fileInputRef.current.click();
  };
  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={onclickHandle}
            >
              <img
                src={profilePic || authUser.profilePic || "/avatar.png"}
                alt="profile pic"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </div>
          {/* USER NAME ONLINE TEXS */}
          <div className="">
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser?.fullname}
            </h3>
            <p className="text-slate-400 text-xs">
              online
            </p>
          </div>
        </div>
         <div className="flex gap-4 items-center">
            <button onClick={logout} className="text-slate-400 hover:text-slate-200 transition-colors">
              <LogOutIcon className="size-5"/>
            </button>
             <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              // play click sound before toggling
              mouseClickSound.currentTime = 0; // reset to start
              mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
          </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
