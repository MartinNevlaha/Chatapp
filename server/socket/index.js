const logger = require("../config/winston");
const timestamp = require("time-stamp");
const config = require("../config/app");

const isAuthSocket = require("./middleware/isAuthSocket");

const users = new Map();
const sockets = new Map();

const SocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    },
  });
  io.use((socket, next) => isAuthSocket(socket, next, config.jwtSecret));

  io.on("connection", (socket) => {
    console.log("preslo to sem", socket.auth);
    let onlineUsers = [];
    socket.on("join", (user) => {
      if (users.has(user.id)) {
        return;
      } else {
        users.set(user.id, { id: user.id, sockets: [socket.id] });
      }
      if (sockets.has(socket.id)) {
        return;
      } else {
        sockets.set(socket.id, { id: socket.id, user: user.id });
      }

      onlineUsers = Array.from(users).map(([name, value]) => name);

      //send array of online users to every active socket
      sockets.forEach((socket) => {
        try {
          io.to(socket.id).emit("onlineUsers", onlineUsers);
        } catch (error) {
          logger.error({
            time: timestamp("YYYY/MM/DD/HH:mm:ss"),
            level: "error",
            message: error,
          });
        }
      });
    });

    socket.on("disconnect", () => {
      const user = sockets.get(socket.id).user;
      sockets.delete(socket.id);
      users.delete(user);
      onlineUsers = onlineUsers.filter((userId) => userId !== user);
      console.log(onlineUsers);
      //send user id when user is going to offline to every active socket
      sockets.forEach((socket) => {
        try {
          io.to(socket.id).emit("offline", user);
        } catch (error) {
          logger.error({
            time: timestamp("YYYY/MM/DD/HH:mm:ss"),
            level: "error",
            message: error,
          });
        }
      });
    });
  });
};

module.exports = SocketServer;
