export const getAccessToken = () => {
  const token = localStorage.getItem("token");
  if (token) return token;

  try {
    const persistAuth = localStorage.getItem("persist:auth");
    if (persistAuth) {
      const auth = JSON.parse(persistAuth);
      if (auth.accessToken && auth.accessToken !== "null") {
        return JSON.parse(auth.accessToken);
      }
    }
  } catch (err) {}
  return null;
};

export const setAccessToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeAccessToken = () => {
  localStorage.removeItem("token");
};
