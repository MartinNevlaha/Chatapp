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
        sockets.set(socket, {id: socket.id, user: user})
      }
      let onlineUsers = [];

      users.forEach((user) => {
        onlineUsers.push(user.id);
      });

      //send to every socket array of online users
      sockets.forEach((socket) => {
        console.log(socket);
        try {
          io.to(socket.id).emit("onlineUsers", onlineUsers);
        } catch (error) {
          console.log(error);
        }
      });
    });

    socket.on("disconnect", (user) => {
      console.log("disconect", user);
    })
  });
};

module.exports = SocketServer;
