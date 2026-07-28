import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Grid,
  MenuItem,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  PhotoCamera,
} from "@mui/icons-material";
import {
  fetchProducts,
  addProduct,
  editProduct,
  removeProduct,
} from "../../../store/slices/product.slice";
import { fetchCategories } from "../../../store/slices/category.slice";
import {
  uploadProductImages,
  deleteProductImage,
} from "../../../api/product.api";
import toast from "react-hot-toast";

function AdminProductsPage() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

 
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    sku: "",
    price: "",
    stock: "",
    brand: "",
    category: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpen = (product = null) => {
    if (product) {
      setEditingId(product._id);
      setExistingImages(product.images || []);
      setFormData({
        name: product.name,
        slug: product.slug,
        description: product.description,
        sku: product.sku,
        price: product.price,
        stock: product.stock,
        brand: product.brand,
        category: product.category?._id || product.category || "",
      });
    } else {
      setEditingId(null);
      setExistingImages([]);
      setFormData({
        name: "",
        slug: "",
        description: "",
        sku: "",
        price: "",
        stock: "",
        brand: "",
        category: "",
      });
    }
    setImageFiles([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const dataToSubmit = {
        ...formData,
        slug: formData.slug.toLowerCase(),
        sku: formData.sku.toUpperCase(),
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      let savedProduct;
      if (editingId) {
        const response = await dispatch(
          editProduct({ id: editingId, data: dataToSubmit }),
        ).unwrap();
        savedProduct = response;
        toast.success("Product updated successfully");
      } else {
        const response = await dispatch(addProduct(dataToSubmit)).unwrap();
        savedProduct = response;
        toast.success("Product created successfully");
      }

      if (imageFiles.length > 0 && savedProduct?._id) {
        const form = new FormData();
        Array.from(imageFiles).forEach((file) => {
          form.append("images", file);
        });
        await uploadProductImages(savedProduct._id, form);
        toast.success("Images uploaded successfully");
      }

      handleClose();
      dispatch(fetchProducts());  
    } catch (error) {
      toast.error(error || "Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(removeProduct(id)).unwrap();
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error(error || "Failed to delete product");
      }
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteProductImage(editingId, imageId);
        setExistingImages((prev) => prev.filter((img) => img._id !== imageId));
        toast.success("Image deleted successfully");
        dispatch(fetchProducts());
      } catch (error) {
        toast.error("Failed to delete image");
      }
    }
  };

  if (loading && products.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Manage Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
              <TableCell
                sx={{ color: "primary.contrastText", fontWeight: "bold" }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{ color: "primary.contrastText", fontWeight: "bold" }}
              >
                Price
              </TableCell>
              <TableCell
                sx={{ color: "primary.contrastText", fontWeight: "bold" }}
              >
                Stock
              </TableCell>
              <TableCell
                sx={{ color: "primary.contrastText", fontWeight: "bold" }}
              >
                Category
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "primary.contrastText", fontWeight: "bold" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id} hover>
                <TableCell>{product.name}</TableCell>
                <TableCell>₹{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.category?.name || "N/A"}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(product)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(product._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Product Form Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="SKU"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                helperText="Select a category for this product"
                required
              >
                <MenuItem value="" disabled>
                  Select a category
                </MenuItem>
                {categories &&
                  categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{ mt: 1, display: "flex", alignItems: "center", gap: 2 }}
              >
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<PhotoCamera />}
                >
                  Upload Images (Up to 5)
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    onChange={(e) => setImageFiles(e.target.files)}
                  />
                </Button>
                {imageFiles.length > 0 && (
                  <Typography variant="body2" color="textSecondary">
                    {imageFiles.length} file(s) selected
                  </Typography>
                )}
              </Box>
              {existingImages.length > 0 && (
                <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
                  {existingImages.map((img) => (
                    <Box
                      key={img._id}
                      sx={{ position: "relative", width: 80, height: 80 }}
                    >
                      <img
                        src={img.url}
                        alt="Product"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                      />
                      <IconButton
                        size="small"
                        color="error"
                        sx={{
                          position: "absolute",
                          top: -8,
                          right: -8,
                          backgroundColor: "white",
                          "&:hover": { backgroundColor: "#ffebee" },
                          border: "1px solid #ccc",
                        }}
                        onClick={() => handleDeleteImage(img._id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminProductsPage;
