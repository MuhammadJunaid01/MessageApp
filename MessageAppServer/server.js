const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const http = require("http");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 7000;
const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  const newId = uuidv4();
  console.log("a user connected", socket.id);
  //   socket.on("disconnect", () => {
  //     console.log("user disconnected", socket.id);
  //   });
  //   //event handle
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });
  socket.on("message", ({ name, room }) => {
    io.emit("broadcast", {
      name: name,
      room: room,
      id: newId,
      time: socket.handshake.time,
    });
  });
});

app.get("/", (req, res) => {
  res.send("message app server is running");
});
httpServer.listen(PORT, () => console.log(`server running on ${PORT}`));
