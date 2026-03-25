import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const JoinRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // receive username from Home
  const [username, setUsername] = useState(location.state?.username || "");
  const [roomId, setRoomId] = useState("");

  const handleJoin = () => {
    if (!roomId || !username) {
      alert("Enter both fields");
      return;
    }

    navigate(`/room/${roomId}`, {
      state: { username },
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl w-[350px]">

        <h2 className="text-2xl text-blue-400 font-bold text-center mb-6">
          Join Room
        </h2>

        <input
          type="text"
          placeholder="Enter Room Code..."
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-white/10 text-white"
        />

        <input
          type="text"
          placeholder="Enter your nickname..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-6 p-3 rounded bg-white/10 text-white"
        />

        <button
          onClick={handleJoin}
          className="w-full bg-blue-500 py-3 rounded text-white"
        >
          Join Room
        </button>

      </div>
    </div>
  );
};

export default JoinRoom;