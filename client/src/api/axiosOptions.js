export const axiosOptions = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
