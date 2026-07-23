import { useState } from "react";

import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";

function TabPanel({ children, value, index }) {
  return (
    <Box hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </Box>
  );
}

function ProductTabs({ product }) {
  const [tab, setTab] = useState(0);

  return (
    <Paper sx={{ mt: 6, p: 3 }}>
      <Tabs value={tab} onChange={(e, value) => setTab(value)}>
        <Tab label="Description" />

        <Tab label="Specifications" />

        <Tab label="Reviews" />
      </Tabs>

      <TabPanel value={tab} index={0}>
        <Typography>
          {product.description || "No description available."}
        </Typography>
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <Typography>
          <strong>Brand:</strong> {product.brand || "N/A"}
        </Typography>

        <Typography>
          <strong>Category:</strong> {product.category || "N/A"}
        </Typography>

        <Typography>
          <strong>Stock:</strong> {product.stock}
        </Typography>

        <Typography>
          <strong>Price:</strong> ₹ {product.price}
        </Typography>
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <Typography>Reviews feature will be added later.</Typography>
      </TabPanel>
    </Paper>
  );
}

export default ProductTabs;
