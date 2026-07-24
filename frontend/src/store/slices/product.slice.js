import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/product.api";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params, thunkAPI) => {
    try {
      const response = await getProducts(params);
      return response.data?.data || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id, thunkAPI) => {
    try {
      const response = await getProductById(id);
      return response.data?.data || null;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product details"
      );
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData, thunkAPI) => {
    try {
      const response = await createProduct(productData);
      return response.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await updateProduct(id, data);
      return response.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

export const removeProduct = createAsyncThunk(
  "product/removeProduct",
  async (id, thunkAPI) => {
    try {
      await deleteProduct(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setProduct(state, action) {
      state.product = action.payload;
    },
    clearProductError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Admin Actions (simplified state updates, typically you might refetch or handle array modifications)
      .addCase(addProduct.fulfilled, (state, action) => {
        if (Array.isArray(state.products)) {
          state.products.push(action.payload);
        }
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        if (Array.isArray(state.products)) {
          const index = state.products.findIndex(p => p._id === action.payload._id);
          if (index !== -1) {
            state.products[index] = action.payload;
          }
        }
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        if (Array.isArray(state.products)) {
          state.products = state.products.filter(p => p._id !== action.payload);
        }
      });
  },
});

export const { setProducts, setProduct, clearProductError } =
  productSlice.actions;

export default productSlice.reducer;
