class Users {
  constructor() {
    this.users = [];
  }

  addUser(userId, socketId) {
    let user = { userId, socketId };
    this.users.push(user);
    return user;
  }

  getUser(userId = null, socketId = null) {
    let user;
    if (userId) {
      user = this.users.filter((user) => user.userId === userId.toString());
    } else {
      user = this.users.filter((user) => user.socketId === socketId.toString());
    }
    return user[0];
  }

  getOnlineUsers() {
    const onlineUsers = this.users.map((user) => user.userId);
    return onlineUsers;
  }

  getOnlineSockets() {
    const onlineSockets = this.users.map((user) => user.socketId);
    return onlineSockets;
  }

  removeUser(userId = null, socketId = null) {
    let user = this.getUser(userId, socketId);
    if (user) this.users = this.users.filter((usr) => usr.userId !== user.userId);
    return user;
  }
}

module.exports = Users;