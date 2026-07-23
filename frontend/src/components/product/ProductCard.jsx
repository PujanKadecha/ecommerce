import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const imageUrl =
    product.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop";

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        component={Link}
        to={`/products/${product._id}`}
        className="img-zoom-container"
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: "133%", // 3:4 Aspect Ratio
          backgroundColor: "#f5f5f5",
          overflow: "hidden",
          display: "block",
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={product.name}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
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
            {product.category}
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
