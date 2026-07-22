import { configureStore } from "@reduxjs/toolkit";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

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

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken", "isAuthenticated"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items", "subtotal"],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    cart: persistReducer(cartPersistConfig, cartReducer),
    wishlist: wishlistReducer,
    order: orderReducer,
    address: addressReducer,
    review: reviewReducer,
    payment: paymentReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
