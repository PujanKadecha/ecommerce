import TextField from "@mui/material/TextField";

function InputField({ label, error, helperText, ...props }) {
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      error={error}
      helperText={helperText}
      {...props}
    />
  );
}

export default InputField;
