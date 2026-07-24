import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const imageUrl =
    product.images?.[0]?.url ||"";

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        component={Link}
        to={`/products/${product._id}`}
        className="img-zoom-container"
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "200px", sm: "260px", md: "300px" },
          backgroundColor: "#f5f5f5",
          overflow: "hidden",
          display: "block",
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={product.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />

        {/* Hover Quick Action Button Bar */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            p: 1.5,
            transform: isHovered ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(4px)",
          }}
        >
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/products/${product._id}`);
            }}
            variant="contained"
            fullWidth
            size="small"
            sx={{
              backgroundColor: "#000000",
              color: "#ffffff",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              py: 1,
              "&:hover": {
                backgroundColor: "#222222",
              },
            }}
          >
            Quick View
          </Button>
        </Box>
      </Box>

      {/* Product Details */}
      <Box
        component={Link}
        to={`/products/${product._id}`}
        sx={{
          pt: 2,
          pb: 1,
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {product.category && (
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#888888",
            }}
          >
            {typeof product.category === 'object' ? product.category?.name : product.category}
          </Typography>
        )}

        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: "0.9rem",
            color: "#111111",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            letterSpacing: "-0.01em",
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "#000000",
            mt: 0.25,
          }}
        >
          ₹{product.price?.toLocaleString() || product.price}
        </Typography>
      </Box>
    </Box>
  );
}

export default ProductCard;
