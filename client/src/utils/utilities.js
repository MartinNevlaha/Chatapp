import moment from "moment";
import { likeStatus } from "../config/likeStatus";

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
  if (totalRecords > limit) number = Math.round(totalRecords / limit);
  return number;
};
