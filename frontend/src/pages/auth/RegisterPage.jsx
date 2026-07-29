import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AuthCard from "../../components/auth/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader";
import InputField from "../../components/forms/InputField";
import PasswordField from "../../components/auth/PasswordField";
import { registerSchema } from "../../validations/auth.validation";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { register as registerUser } from "../../store/slices/auth.slice";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    const { confirmPassword, ...registerData } = data;

    const result = await dispatch(registerUser(registerData));

    if (registerUser.fulfilled.match(result)) {
      toast.success(result.payload.message);

      navigate("/auth/login");
    } else {
      toast.error(result.payload?.message || "Registration Failed");
    }
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Create Account"
        subtitle="Join us and start shopping"
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="First Name"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />

        <InputField
          label="Last Name"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />

        <InputField
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <PasswordField
          label="Password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <PasswordField
          label="Confirm Password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            mt: 3,
            py: 1.75,
            fontWeight: 700,
            fontSize: "0.875rem",
            letterSpacing: "0.08em",
          }}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
        {error && (
          <Typography
            color="error"
            mt={2}
            textAlign="center"
            sx={{ fontSize: "0.85rem" }}
          >
            {error}
          </Typography>
        )}

        <Typography
          textAlign="center"
          mt={4}
          sx={{ color: "#888888", fontSize: "0.875rem" }}
        >
          Already have an account?{" "}
          <Link
            to="/auth/login"
            style={{
              color: "#111111",
              fontWeight: 700,
              textDecoration: "none",
              borderBottom: "1px solid #111111",
            }}
          >
            Sign in
          </Link>
        </Typography>
      </form>
    </AuthCard>
  );
}

export default RegisterPage;
