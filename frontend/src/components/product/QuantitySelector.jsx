import { Box, IconButton, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

function QuantitySelector({ quantity, setQuantity, max = 99 }) {
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
    <Box sx={{ my: 3 }}>
      <Typography
        variant="caption"
        sx={{
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#666666",
          display: "block",
          mb: 1,
        }}
      >
        Quantity
      </Typography>

      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          border: "1px solid #111111",
          height: 44,
        }}
      >
        <IconButton
          onClick={decrease}
          disabled={quantity <= 1}
          size="small"
          sx={{
            borderRadius: 0,
            color: "#000000",
            width: 40,
            height: "100%",
          }}
        >
          <Remove fontSize="small" />
        </IconButton>

        <Typography
          variant="body2"
          sx={{
            width: 48,
            textAlign: "center",
            fontWeight: 700,
            fontSize: "0.9rem",
          }}
        >
          {quantity}
        </Typography>

        <IconButton
          onClick={increase}
          disabled={quantity >= max}
          size="small"
          sx={{
            borderRadius: 0,
            color: "#000000",
            width: 40,
            height: "100%",
          }}
        >
          <Add fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default QuantitySelector;
