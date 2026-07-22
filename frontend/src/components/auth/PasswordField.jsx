import { useState } from "react";

import { IconButton, InputAdornment, TextField } from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

function PasswordField({ error, helperText, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      fullWidth
      margin="normal"
      type={showPassword ? "text" : "password"}
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}

export default PasswordField;
