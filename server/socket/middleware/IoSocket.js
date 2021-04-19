const jwt = require("jsonwebtoken");

class IoSocket {
  constructor(io, secret) {
    this.io = io;
    this.secret = secret;
  }

  authenticate() {
    this.io.use((socket, next) => {
      let error;
      try {
        const token = socket.handshake.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, this.secret, (err, user) => {
          if (err) {
            error = new Error("Token is invalid");
            error.data = "Socket auth failed";
          }
          return user;
        });
        if (error) {
          next(error);
        } else {
          socket.auth = decodedToken;
          next();
        }
      } catch (error) {
        next(error);
      }
    })
  }
}

module.exports = IoSocket;