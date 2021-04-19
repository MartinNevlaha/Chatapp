const logger = require("../config/winston");
const timestamp = require("time-stamp");
const config = require("../config/app");

const IoSocket = require("./middleware/IoSocket");
const Users = require("./users/users");

let users = new Users()

const SocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    },
  });
  const IoSocketInstance = new IoSocket(io, config.jwtSecret);
  // auth socket connection by token when its failed user unble connect to chat
  IoSocketInstance.authenticate();

  io.on("connection", (socket) => {
    socket.on("join", (user) => {
      let onlineUsers = [];

      if (users.getUser(user.id)) {
        return;
      } else {
        users.addUser(user.id, socket.id);
      }

      onlineUsers = users.getOnlineUsers();

      //send array of online users to every active socket
      const sockets = users.getOnlineSockets();
      sockets.forEach((socket) => {
        try {
          io.to(socket).emit("onlineUsers", onlineUsers);
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
      const user = users.removeUser(null, socket.id);
      const sockets = users.getOnlineSockets();
      //send user id when user is going to offline to every active socket
      sockets.forEach((socket) => {
        try {
          io.to(socket).emit("offline", user.userId);
        } catch (error) {
          console.log(error);
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
