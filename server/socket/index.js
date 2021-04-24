const config = require("../config/app");
const logger = require("../config/winston");
const timestamp = require("time-stamp");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const { createMessage } = require("./dbQueries");
const IoSocket = require("./middleware/IoSocket");
const Users = require("./users/users");

let users = new Users();

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
      console.log("join", users.getOnlineUsers());
      onlineUsers = users.getOnlineUsers();

      //send array of online users to every active socket
      io.emit("onlineUsers", onlineUsers);

      /*
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
      */
    });

    socket.on("sendMessage", async (msg) => {
      const recipient = users.getUser(msg.toUserId);
      try {
        const savedMsg = await createMessage(msg);
        console.log(savedMsg);
        if (recipient) {
          msg.id = savedMsg.id;
          msg.message = savedMsg.message;
          msg.User = msg.fromUser;
          msg.fromUserId = msg.fromUser.id;
          msg.createdAt = savedMsg.createdAt;
          msg.updatedAt = savedMsg.updatedAt;
          io.to(recipient.socketId).emit("receiveMessage", msg);
        }
      } catch (error) {
        logger.error({
          time: timestamp("YYYY/MM/DD/HH:mm:ss"),
          level: "error",
          message: error,
        });
      }
    });

    socket.on("typing", (msg) => {
      const recipient = users.getUser(msg.toUserId);
      if (recipient) {
        io.to(recipient.socketId).emit("typing", msg);
      }
    });

    socket.on("disconnect", () => {
      const user = users.removeUser(null, socket.id);
      console.log(
        "disconect",
        users.getOnlineUsers(),
        users.getOnlineSockets()
      );
      //send user id when user is going to offline to every active socket
      if (user) io.emit("offline", user.userId);
      /*
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
      */
    });
  });
};

module.exports = SocketServer;
