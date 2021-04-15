import moment from "moment";
import { likeStatus } from "../constants/likeStatus";

export const updateObj = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const parseDateTime = (ISOString) => {
  const convertDate = moment(ISOString);
  const date = convertDate.utc().format("YYYY-MM-DD");
  const time = convertDate.utc().format("HH:mm:ss");
  return date + " " + time;
};

export const generateRandomNumbers = () => {
  let number = Math.floor(100000 + Math.random() * 900000).toString();
  number = number.substring();
  return number;
};

export const getLikeNumber = (likesArr, type) => {
  let likes = 0;
  if (type === likeStatus.like) {
    likesArr.forEach((like) => {
      if (like.status === likeStatus.like) {
        likes += 1;
      }
    });
  } else if (type === likeStatus.dislike) {
    likesArr.forEach((like) => {
      if (like.status === likeStatus.dislike) {
        likes += 1;
      }
    });
  }
  return likes;
};

export const isLiked = (likeArr, userId, status) => {
  let isLiked = false;

  likeArr.forEach((like) => {
    if (userId === like.userId && like.status === status) {
      isLiked = true;
    }
  });

  return isLiked;
};

export const numberOfPages = (totalRecords, limit) => {
  let number = 1;
  if (totalRecords > limit) number = (totalRecords + limit - 1) / limit;
  return number;
};

export const likePostReducerHelper = (postIndex, postsArr, action) => {
  let updatedArr = [];
  if (action.likeAction === "deleted") {
    updatedArr = postsArr[postIndex].Likes.filter(
      (like) => like.id !== action.likes.id
    );
  } else if (action.likeAction === "created") {
    updatedArr = postsArr[postIndex].Likes.concat(action.likes);
  } else if (action.likeAction === "updated") {
    const likeIndex = postsArr[postIndex].Likes.findIndex(
      (like) => like.id === action.likes.id
    );
    updatedArr = postsArr[postIndex].Likes.map((like, i) => {
      if (i === likeIndex) {
        like.status = action.likes.status;
      }
      return like;
    });
  }
  return updatedArr;
};

export const showLikeHelper = (likes, likeType) => {
  let updatedUserLikes = [];
  likes.forEach((like) => {
    if (like.status === likeType) updatedUserLikes.push(like.User);
  });
  return updatedUserLikes;
};

const filterByUserChoice = (friends, filterBy) => {
  if (filterBy !== "all") {
    return friends.filter((friend) => friend.status === filterBy);
  } else {
    return friends;
  }
};

export const searchFriendsHelper = (friends, filterBy, searchValue) => {
  if (searchValue.length > 0) {
    return filterByUserChoice(friends, filterBy).filter((val) =>
      val.fullName.toString().toLowerCase().includes(searchValue.toLowerCase())
    );
  } else {
    return filterByUserChoice(friends, filterBy);
  }
};
