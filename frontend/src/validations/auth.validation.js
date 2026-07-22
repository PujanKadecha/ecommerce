import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object({
  firstName: yup.string().required("First name is required"),

  lastName: yup.string().required("Last name is required"),

  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup
    .string()
    .min(8, "Minimum 8 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});
