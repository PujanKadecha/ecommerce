import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";

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

  const onSubmit = (data) => {
    console.log(data);
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

        <Stack
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
        </Stack>

        <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
          Login
        </Button>

        <Typography textAlign="center" mt={3}>
          Don't have an account? <Link to="/auth/register">Register</Link>
        </Typography>
      </form>
    </AuthCard>
  );
}

export default LoginPage;
