export const ICE_SERVERS = [
  { urls: process.env.REACT_APP_STUN_SERVER_1 },
  { urls: process.env.REACT_APP_TURN_SERVER_2 },
  {
    urls: process.env.REACT_APP_TURN_SERVER,
    username: process.env.REACT_APP_TURN_SERVER_USERNAME,
    credential: process.env.REACT_APP_TURN_SERVER_PASSWORD,
  },
];
