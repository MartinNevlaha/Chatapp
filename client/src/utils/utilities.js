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
