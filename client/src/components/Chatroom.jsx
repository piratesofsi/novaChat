import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");


const Chatroom = () => {

  const { roomId } = useParams();
   
  const location = useLocation();
  const username = location.state?.username;
  const navigate  = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [joined, setJoin] = useState(false);




  // redirect if no username
useEffect(() => {
  if (!username) {
    navigate("/", { state: { roomId } });
  }
}, [username]);

// join room once username exists
useEffect(() => {
  if (username) {
    socket.emit("join-room", {
      roomId,
      userName: username
    });
  }
}, [username]);


  useEffect(() => {

    socket.on("chat-history", (history) => {
      setMessages(history);
    });

    socket.on("message", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      // cleanup
      socket.off("message");
      socket.off("chat-history");
    };

  }, []);

  function sendMessage() {

    if (message.trim() === "") return;

    socket.emit("send-message", {
      roomId,
      user: username,
      text: message
    });

    setMessage("");

  }



return (
  <section className="w-full h-screen bg-gradient-to-br from-black via-gray-900 to-black flex justify-center items-center">

    <div className="w-[95%] md:w-[60%] lg:w-[40%] h-[90vh] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col shadow-2xl">

      {/* HEADER */}
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        <h2 className="text-white font-semibold">
          Room: <span className="text-blue-400">{roomId}</span>
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => navigator.clipboard.writeText(roomId)}
            className="bg-blue-500 hover:bg-blue-600 transition px-3 py-1 rounded text-sm text-white"
          >
            Copy
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded text-sm text-white"
          >
            Leave
          </button>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.map((m, i) => {
          const isMe = m.user === username;

          return (
            <div
              key={i}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-xl text-sm shadow-md
                ${isMe
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-800 text-white rounded-bl-none"
                  }`}
              >
                {!isMe && (
                  <p className="text-xs text-gray-400 mb-1">{m.user}</p>
                )}
                <p>{m.text}</p>
              </div>
            </div>
          );
        })}

      </div>

      {/* INPUT */}
      <div className="p-3 border-t border-white/10 flex gap-2 bg-black/30">

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 transition px-5 py-2 rounded-lg text-white font-medium"
        >
          Send
        </button>

      </div>

    </div>

  </section>
);

}

export default Chatroom;