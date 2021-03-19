const logger = require("../config/winston");
const timestamp = require("time-stamp");

const users = new Map();
const sockets = new Map();


const SocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", (user) => {
      if (users.has(user.id)) {
        return;
      } else {
        users.set(user, { id: user, sockets: [socket.id] });
      }
      if (sockets.has(socket.id)) {
        return;
      } else {
        sockets.set(socket, {id: socket.id, user: user})
      }
      let onlineUsers = [];
      users.forEach((user) => {
        onlineUsers.push(user.id);
      });

      //send array of online users to every active socket
      sockets.forEach((socket) => {
        try {
          io.to(socket.id).emit("onlineUsers", onlineUsers);
        } catch (error) {
          logger.log({
            time: timestamp("YYYY/MM/DD/HH:mm:ss"),
            level: "error",
            message: error,
          })
        }
      });
    });

    socket.on("disconnect", () => {
      let user;
      sockets.forEach(sock => {
        if (sock.id === socket.id) {
          user = sock.user
        }
      })
      sockets.delete(socket.id);
      users.delete(user);
      //send user id when user is going to offline to every active socket
      sockets.forEach(sock => {
        try {
          io.to(sock.id).emit("offline", user);
        } catch (error) {
          logger.log({
            time: timestamp("YYYY/MM/DD/HH:mm:ss"),
            level: "error",
            message: error,
          })
        }
        
      })
    })
  });
};

module.exports = SocketServer;
