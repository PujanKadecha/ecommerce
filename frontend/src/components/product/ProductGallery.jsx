import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";

function ProductGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState("");

  const defaultPlaceholder = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop";

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0].url);
    } else {
      setSelectedImage(defaultPlaceholder);
    }
  }, [images]);

  const displayImages = images.length > 0 ? images : [{ url: defaultPlaceholder }];

  return (
    <Stack
      direction={{ xs: "column-reverse", md: "row" }}
      spacing={2}
      sx={{ width: "100%" }}
    >
      {/* Thumbnail Strip */}
      {displayImages.length > 1 && (
        <Stack
          direction={{ xs: "row", md: "column" }}
          spacing={1.5}
          sx={{
            overflowX: { xs: "auto", md: "visible" },
            maxWidth: { xs: "100%", md: 100 },
          }}
        >
          {displayImages.map((image, index) => (
            <Box
              key={index}
              onClick={() => setSelectedImage(image.url)}
              sx={{
                width: { xs: 70, md: 80 },
                height: { xs: 88, md: 104 },
                flexShrink: 0,
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                overflow: "hidden",
                border: selectedImage === image.url ? "1.5px solid #000000" : "1.5px solid transparent",
                transition: "border-color 0.2s ease",
              }}
            >
              <Box
                component="img"
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Stack>
      )}

      {/* Main Active Image Container */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#f8f8f8",
          aspectRatio: "3/4",
          maxHeight: { xs: 450, md: 680 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={selectedImage || defaultPlaceholder}
          alt="Product"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    </Stack>
  );
}

export default ProductGallery;
