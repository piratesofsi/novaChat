import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from "uuid";
import logo from "../../public/logonovo.svg"

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const location = useLocation();

  const sharedRoomId = location.state?.roomId;

  function createRoom() {
    if (!username) {
      alert("Enter username first");
      return;
    }

    if (sharedRoomId) {
      navigate(`/room/${sharedRoomId}`, {
        state: { username }
      });
    } else {
      const roomId = uuidv4().slice(0, 6);
      navigate(`/room/${roomId}`, {
        state: { username }
      });
    }
  }

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">

      {/* CARD */}
      <div className="w-[90%] md:w-[60%] lg:w-[35%] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

        {/* LOGO */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <img src={logo} alt="NovaChat Logo" width="42px" />
            <h2 className="text-blue-400 text-3xl font-bold tracking-wide">
              NovaChat
            </h2>
          </div>

          <p className="text-gray-400 text-sm text-center max-w-[80%]">
            Instant anonymous rooms for private conversations
          </p>
        </div>

        {/* INPUT */}
        <div className="mt-10 flex flex-col gap-4">

          <input
            type="text"
            placeholder="Enter your nickname..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition"
          />

          <button
            onClick={createRoom}
            className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-semibold text-white shadow-md"
          >
            {sharedRoomId ? "Join Room" : "Create Room"}
          </button>

        </div>

        {/* JOIN SECTION */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Already have a code?
          </p>

          <button
            onClick={() => navigate("/room/join", { state: { username } })}
            className="text-blue-400 hover:underline text-sm mt-1 transition"
          >
            Join via code
          </button>
        </div>

      </div>

    </section>
  )
}

export default Home;