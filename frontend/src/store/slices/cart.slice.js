import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCart,
  addToCart as addToCartApi,
  updateCartItem as updateCartItemApi,
  removeCartItem as removeCartItemApi,
  clearCart as clearCartApi,
} from "../../api/cart.api";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
  try {
    const res = await getCart();
    return res.data?.data || { items: [], subtotal: 0 };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch cart");
  }
});

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const res = await addToCartApi(productId, quantity);
      return res.data?.data || { items: [], subtotal: 0 };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add to cart");
    }
  }
);

export const updateItemQuantity = createAsyncThunk(
  "cart/updateItemQuantity",
  async ({ itemId, quantity }, thunkAPI) => {
    try {
      const res = await updateCartItemApi(itemId, quantity);
      return res.data?.data || { items: [], subtotal: 0 };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update item");
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (itemId, thunkAPI) => {
    try {
      const res = await removeCartItemApi(itemId);
      return res.data?.data || { items: [], subtotal: 0 };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to remove item");
    }
  }
);

export const emptyCart = createAsyncThunk("cart/emptyCart", async (_, thunkAPI) => {
  try {
    await clearCartApi();
    return { items: [], subtotal: 0 };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to clear cart");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    subtotal: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setCart(state, action) {
      state.items = action.payload.items || [];
      state.subtotal = action.payload.subtotal || 0;
    },
    clearCart(state) {
      state.items = [];
      state.subtotal = 0;
    },
  },
  extraReducers: (builder) => {
    const handleFulfilled = (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.items = action.payload.items || [];
        state.subtotal = action.payload.subtotal || 0;
      }
    };

    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, handleFulfilled)
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItemToCart.fulfilled, handleFulfilled)
      .addCase(updateItemQuantity.fulfilled, handleFulfilled)
      .addCase(removeItemFromCart.fulfilled, handleFulfilled)
      .addCase(emptyCart.fulfilled, handleFulfilled);
  },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
