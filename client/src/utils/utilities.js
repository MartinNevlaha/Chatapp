import moment from "moment";

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

