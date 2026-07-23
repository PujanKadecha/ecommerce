import { useState } from "react";
import { Button, Typography, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import AuthCard from "../../components/auth/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader";
import InputField from "../../components/forms/InputField";
import { forgotPassword } from "../../api/auth.api";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      const res = await forgotPassword(email);
      setMessage(res.data?.message || "Password reset link sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Reset Password"
        subtitle="Enter your email to receive password reset instructions"
      />

      {message && <Alert severity="success" sx={{ mb: 2, borderRadius: 0 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 0 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <InputField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={submitting}
          sx={{ mt: 3, backgroundColor: "#000000", color: "#ffffff" }}
        >
          {submitting ? "Sending..." : "Send Reset Link"}
        </Button>

        <Typography textAlign="center" mt={3} variant="body2">
          Remembered your password? <Link to="/auth/login">Login</Link>
        </Typography>
      </form>
    </AuthCard>
  );
}

export default ForgotPasswordPage;
