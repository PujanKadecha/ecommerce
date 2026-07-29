import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login } from "../../store/slices/auth.slice";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "../../components/forms/InputField";
import PasswordField from "../../components/auth/PasswordField";
import AuthCard from "../../components/auth/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader";

import { loginSchema } from "../../validations/auth.validation";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    const result = await dispatch(login(data));

    if (login.fulfilled.match(result)) {
      toast.success(result.payload.message);

      navigate("/");
    } else {
      toast.error(result.payload?.message || "Login Failed");
    }
  };

  return (
    <AuthCard>
      <AuthHeader title="Welcome Back" subtitle="Login to continue" />

      <form onSubmit={handleSubmit(onSubmit)}>
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

        {/* <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt={1}
        >
          <FormControlLabel control={<Checkbox />} label="Remember Me" />

          <Typography
            component={Link}
            to="/auth/forgot-password"
            sx={{
              textDecoration: "none",
            }}
          >
            Forgot Password?
          </Typography>
        </Stack> */}

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
          {loading ? "Signing In..." : "Sign In"}
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
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            style={{
              color: "#111111",
              fontWeight: 700,
              textDecoration: "none",
              borderBottom: "1px solid #111111",
            }}
          >
            Create one
          </Link>
        </Typography>
      </form>
    </AuthCard>
  );
}

export default LoginPage;
