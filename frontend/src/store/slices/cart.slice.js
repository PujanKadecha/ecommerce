import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],

    subtotal: 0,
  },

  reducers: {
    setCart(state, action) {
      state.items = action.payload.items;

      state.subtotal = action.payload.subtotal;
    },

    clearCart(state) {
      state.items = [];

      state.subtotal = 0;
    },
  },
});

export const {
  setCart,

  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
