// importing express
const express = require("express");

// importing http
const http = require("http");

// importing socket.io
const { Server } = require("socket.io");

// cors middleware
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

// create socket server
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// store messages per room (in memory)
const roomMessages = {};

// socket connection
io.on("connection", (socket) => {
  console.log("user connected:", socket.id);

  // user joins room
  socket.on("join-room", ({ roomId, userName }) => {

    socket.join(roomId);

    console.log(`${userName} joined room ${roomId}`);

    // send previous messages to the user
    if (roomMessages[roomId]) {
      socket.emit("chat-history", roomMessages[roomId]);
    }

    // notify others
    socket.to(roomId).emit("message", {
      user: "system",
      text: `${userName} joined the chat`
    });

  });

  // user sends message
  socket.on("send-message", ({ roomId, user, text }) => {

    const msg = { user, text };

    // create room storage if not exists
    if (!roomMessages[roomId]) {
      roomMessages[roomId] = [];
    }

    // store message
    roomMessages[roomId].push(msg);

    // send message to everyone in room
    io.to(roomId).emit("message", msg);

  });

  // user disconnects
  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });

});

// start server
server.listen(3001, () => {
  console.log("GhostChat server running on port 3001 👻");
});