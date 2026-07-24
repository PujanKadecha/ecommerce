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
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, PhotoCamera } from "@mui/icons-material";
import { fetchCategories, addCategory, editCategory, removeCategory } from "../../../store/slices/category.slice";
import { uploadCategoryImage } from "../../../api/category.api";
import toast from "react-hot-toast";

function AdminCategoriesPage() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpen = (category = null) => {
    if (category) {
      setEditingId(category._id);
      setFormData({
        name: category.name,
        slug: category.slug || "",
        description: category.description || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        slug: "",
        description: "",
      });
    }
    setImageFile(null);
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
      };

      let savedCategory;
      if (editingId) {
        const response = await dispatch(editCategory({ id: editingId, data: dataToSubmit })).unwrap();
        savedCategory = response;
        toast.success("Category updated successfully");
      } else {
        const response = await dispatch(addCategory(dataToSubmit)).unwrap();
        savedCategory = response;
        toast.success("Category created successfully");
      }
      
      if (imageFile && savedCategory?._id) {
        const form = new FormData();
        form.append("image", imageFile);
        await uploadCategoryImage(savedCategory._id, form);
        toast.success("Image uploaded successfully");
      }

      handleClose();
      dispatch(fetchCategories());
    } catch (error) {
      toast.error(error || "Failed to save category");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await dispatch(removeCategory(id)).unwrap();
        toast.success("Category deleted successfully");
      } catch (error) {
        toast.error(error || "Failed to delete category");
      }
    }
  };

  if (loading && (!categories || categories.length === 0)) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Manage Categories
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Category
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "primary.contrastText", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "primary.contrastText", fontWeight: "bold" }}>Description</TableCell>
              <TableCell align="right" sx={{ color: "primary.contrastText", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories && categories.map((category) => (
              <TableRow key={category._id} hover>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description || "N/A"}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(category)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(category._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {(!categories || categories.length === 0) && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No categories found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Category Form Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            margin="normal"
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
              Upload Image
              <input
                type="file"
                hidden
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </Button>
            {imageFile && (
              <Typography variant="body2" color="textSecondary">
                Selected: {imageFile.name}
              </Typography>
            )}
          </Box>
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

export default AdminCategoriesPage;
