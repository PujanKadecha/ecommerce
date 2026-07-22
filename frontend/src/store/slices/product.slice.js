import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",

  initialState: {
    products: [],

    product: null,

    loading: false,
  },

  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },

    setProduct(state, action) {
      state.product = action.payload;
    },
  },
});

export const {
  setProducts,

  setProduct,
} = productSlice.actions;

export default productSlice.reducer;
