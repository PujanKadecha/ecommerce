import { useState, useEffect } from "react";
import { Box } from "@mui/material";

function ProductGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0].url);
    }
  }, [images]);

  return (
    <Box>
      <Box
        component="img"
        src={selectedImage || "https://placehold.co/600x600?text=No+Image"}
        alt="Product"
        sx={{
          width: "100%",
          height: 450,
          objectFit: "contain",
          border: "1px solid #ddd",
          borderRadius: 2,
          mb: 2,
        }}
      />

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image.url}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(image.url)}
            sx={{
              width: 80,
              height: 80,
              objectFit: "contain",
              border:
                selectedImage === image.url
                  ? "2px solid #1976d2"
                  : "1px solid #ddd",
              borderRadius: 1,
              cursor: "pointer",
              p: 1,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ProductGallery;
