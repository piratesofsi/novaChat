import { useState, useEffect } from "react";
import { Route, Router, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import Home from "./components/Home";
import Chatroom from "./components/Chatroom";
import JoinRoom from "./components/Joinroom";



function App() {


  return (
    <div>

      {/* create routes  */}
      <Routes>
        {/* home */}
        <Route path="/" element={<Home />} />
        {/* chat room  */} 
         <Route path="/room/join" element={<JoinRoom/>} />
        <Route path="/room/:roomId" element={<Chatroom />} />

      


      </Routes>

    </div>
  );
}

export default App;