import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Typography, Alert } from "@mui/material";
import AuthCard from "../../components/auth/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader";
import PasswordField from "../../components/auth/PasswordField";
import { resetPassword } from "../../api/auth.api";
import toast from "react-hot-toast";

function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await resetPassword(token, password);
      toast.success("Password reset successfully!");
      navigate("/auth/login");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Set New Password"
        subtitle="Create a new password for your account"
      />

      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 0 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <PasswordField
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <PasswordField
          label="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={submitting}
          sx={{ mt: 3, backgroundColor: "#000000", color: "#ffffff" }}
        >
          {submitting ? "Resetting..." : "Reset Password"}
        </Button>

        <Typography textAlign="center" mt={3} variant="body2">
          Back to <Link to="/auth/login">Login</Link>
        </Typography>
      </form>
    </AuthCard>
  );
}

export default ResetPasswordPage;
