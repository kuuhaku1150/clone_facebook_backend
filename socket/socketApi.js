var socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};
const { addUser, getUser, getUsers } = require("./configSocket");
socketApi.io = io;

io.on("connect", function (socket) {
  socket.on("new_message", (data) => {
    io.emit("receive_message", {
      username: data.username,
      receiveMessage: data.message,
      time: data.time,
      index: data.index,
    });
  });
  socket.on("disconnect", function () {
    console.log("Disconnect");
  });
});


module.exports = socketApi;
