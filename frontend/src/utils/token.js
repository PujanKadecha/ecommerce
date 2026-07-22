export const getAccessToken = () => {
  return localStorage.getItem("token");
};

export const setAccessToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeAccessToken = () => {
  localStorage.removeItem("token");
};
