import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/category.api";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await getCategories();
      return response.data?.data || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (categoryData, thunkAPI) => {
    try {
      const response = await createCategory(categoryData);
      return response.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create category"
      );
    }
  }
);

export const editCategory = createAsyncThunk(
  "category/editCategory",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await updateCategory(id, data);
      return response.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update category"
      );
    }
  }
);

export const removeCategory = createAsyncThunk(
  "category/removeCategory",
  async (id, thunkAPI) => {
    try {
      await deleteCategory(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete category"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCategoryError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
      .addCase(addCategory.fulfilled, (state, action) => {
        if (Array.isArray(state.categories)) {
          state.categories.push(action.payload);
        }
      })
    
      .addCase(editCategory.fulfilled, (state, action) => {
        if (Array.isArray(state.categories)) {
          const index = state.categories.findIndex((c) => c._id === action.payload._id);
          if (index !== -1) {
            state.categories[index] = action.payload;
          }
        }
      })
     
      .addCase(removeCategory.fulfilled, (state, action) => {
        if (Array.isArray(state.categories)) {
          state.categories = state.categories.filter((c) => c._id !== action.payload);
        }
      });
  },
});

export const { clearCategoryError } = categorySlice.actions;

export default categorySlice.reducer;