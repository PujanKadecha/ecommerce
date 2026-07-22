import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth.slice";
import userReducer from "./slices/user.slice";
import productReducer from "./slices/product.slice";
import categoryReducer from "./slices/category.slice";
import cartReducer from "./slices/cart.slice";
import wishlistReducer from "./slices/wishlist.slice";
import orderReducer from "./slices/order.slice";
import addressReducer from "./slices/address.slice";
import reviewReducer from "./slices/review.slice";
import paymentReducer from "./slices/payment.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
    address: addressReducer,
    review: reviewReducer,
    payment: paymentReducer,
  },
});

export default store;
