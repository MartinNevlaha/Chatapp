const SocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    },
  });

  io.on("connection", socket => {
    socket.on("join", (user) => {
      console.log("client connected", user);
    })
  })



};

module.exports = SocketServer;