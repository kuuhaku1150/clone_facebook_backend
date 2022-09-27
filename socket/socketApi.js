var socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};
const { addUser, getUser, getUsers } = require("./configSocket");
socketApi.io = io;

io.on("connect", function (socket) {
  let test = "";
  // socket.on("join_room", (room, name, callback = () => {}) => {
  //   // const { user, error } = addUser(socket.id, name, room);
  //   // if (error) return callback(error);
  //   socket.join(user.room);
  //   // socket.in(room).emit("notification", {
  //   //   title: "Someone's here",
  //   //   description: `${user.name} just entered the room`,
  //   // });
  //   // io.in(room).emit("users", getUsers(room));
  //   // callback();
  //   // console.log(`User with ID: ${socket.id} joined room: ${room}`);
  // });
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

// socketApi.sendComments = function (data, id) {
//   io.sockets.emit("receive_comment", {
//     contentId: id,
//     comm: data[data.length - 1].userComment.comm,
//     userComm: data[data.length - 1].userComment.userComm,
//   });
// };

module.exports = socketApi;
