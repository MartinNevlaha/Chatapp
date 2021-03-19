const Friendship = require("../models").Friendship;
const logger = require("../config/winston");
const timestamp = require("time-stamp");

exports.clearRejectedRequest = async () => {
  try {
    let rejectedRequests = [];
    const rejectedFriendshipRequests = await Friendship.findAll({
      where: {
        status: 2,
      },
    });
    if (rejectedFriendshipRequests.length > 0) {
      rejectedFriendshipRequests.forEach(request => rejectedRequests.push(request.id))
      await Friendship.destroy({where: {id: rejectedRequests}});
      logger.log({
        time: timestamp("YYYY/MM/DD/HH:mm:ss"),
        level: "info",
        message: `Rejected requests with ids ${rejectedRequests.toString()} was deleted.`,
      })
    }
  } catch (error) {
    logger.error({
      time: timestamp("YYYY/MM/DD/HH:mm:ss"),
      level: "error",
      message: error,
    });
  }
};
