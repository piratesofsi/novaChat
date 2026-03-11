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
    <section className="w-full relative bg-black h-screen  flex justify-center items-center">
      <div className="min-w-[40%] h-[90vh] border rounded-2xl border-white/20 p-4 ">
        <div className="flex flex-col   p-4 h-full  ">
          <div className="flex justify-between pb-3">   <h2 className="text-white text-left pb-2 ">RoomId : {roomId}

          </h2>
          <button className="bg-blue-500 rounded px-3 ">copy LInk</button>
          </div>

          {/* MESSAGE AREA */}
          <div className="flex-1 overflow-y-auto p-4 border rounded border-white/20 ">
            {/* messages will render here */}
            {messages.map((m, i) => (
              <p className="text-white" key={i}>{m.user}: {m.text}</p>
            ))}
          </div>

          {/* inputs  */}
          <div className="flex gap-1 text-white mt-auto pt-3">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
               onKeyDown={(e)=>{
              if(e.key==="Enter"){
                sendMessage();
              }
            }}
              className="flex-1 px-3 py-2 bg-transparent border border-gray-500 rounded"
              placeholder="Enter your message..."
            />

            <button onClick={sendMessage}
            
              className="text-white bg-blue-500 rounded px-4 py-2"
            >
              Send
            </button>
          </div>



        </div>
      </div>

    </section>


  )

}

export default Chatroom;