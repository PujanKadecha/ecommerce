import { useState } from "react";
import { Box, Tab, Tabs, Typography, Divider } from "@mui/material";

function TabPanel({ children, value, index }) {
  return (
    <Box hidden={value !== index} role="tabpanel">
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </Box>
  );
}

function ProductTabs({ product }) {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ mt: 10 }}>
      <Tabs
        value={tab}
        onChange={(e, value) => setTab(value)}
        sx={{
          borderBottom: "1px solid #e5e5e5",
          "& .MuiTabs-indicator": {
            backgroundColor: "#000000",
            height: 2,
          },
        }}
      >
        <Tab
          label="Description"
          sx={{
            fontWeight: 700,
            fontSize: "0.85rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#666666",
            "&.Mui-selected": { color: "#000000" },
          }}
        />
        <Tab
          label="Specifications"
          sx={{
            fontWeight: 700,
            fontSize: "0.85rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#666666",
            "&.Mui-selected": { color: "#000000" },
          }}
        />
        <Tab
          label="Reviews"
          sx={{
            fontWeight: 700,
            fontSize: "0.85rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#666666",
            "&.Mui-selected": { color: "#000000" },
          }}
        />
      </Tabs>

      <TabPanel value={tab} index={0}>
        <Typography sx={{ color: "#444444", lineHeight: 1.8, fontSize: "0.95rem" }}>
          {product.description || "No description available."}
        </Typography>
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, maxWidth: 400 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ color: "#666666", fontWeight: 600 }}>
              Brand:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {product.brand || "N/A"}
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "#f0f0f0" }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ color: "#666666", fontWeight: 600 }}>
              Category:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {(typeof product.category === 'object' ? product.category?.name : product.category) || "N/A"}
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "#f0f0f0" }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ color: "#666666", fontWeight: 600 }}>
              Stock Availability:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {product.stock} units
            </Typography>
          </Box>
        </Box>
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <Typography sx={{ color: "#666666", fontStyle: "italic", fontSize: "0.9rem" }}>
          Customer reviews and ratings for this product.
        </Typography>
      </TabPanel>
    </Box>
  );
}

export default ProductTabs;
