import { Box, IconButton, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

function QuantitySelector({ quantity, setQuantity, max }) {
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mt: 3,
        mb: 3,
      }}
    >
      <Typography fontWeight="bold">Quantity</Typography>

      <IconButton onClick={decrease}>
        <Remove />
      </IconButton>

      <Typography
        variant="h6"
        sx={{
          width: 40,
          textAlign: "center",
        }}
      >
        {quantity}
      </Typography>

      <IconButton onClick={increase}>
        <Add />
      </IconButton>
    </Box>
  );
}

export default QuantitySelector;
