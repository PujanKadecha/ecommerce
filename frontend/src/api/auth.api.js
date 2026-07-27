import api from "./axios";

export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

export const verifyEmail = (token) => {
  return api.get(`/auth/verify-email/${token}`);
};

export const resendVerification = (email) => {
  return api.post("/auth/resend-verification", {
    email,
  });
};

// export const forgotPassword = (email) => {
//   return api.post("/auth/forgot-password", {
//     email,
//   });
// };

export const resetPassword = (token, password) => {
  return api.post(`/auth/reset-password/${token}`, {
    password,
  });
};

export const logoutUser = (refreshToken) => {
  return api.post("/auth/logout", { refreshToken });
};

export const getCurrentUser = () => {
  return api.get("/users/me");
};

export const enableTwoFactor = () => {
  return api.post("/auth/2fa/enable");
};

export const verifyTwoFactor = (token) => {
  return api.post("/auth/2fa/verify", {
    token,
  });
};

export const disableTwoFactor = () => {
  return api.post("/auth/2fa/disable");
};

export const googleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
};
