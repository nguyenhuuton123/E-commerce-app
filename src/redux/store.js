import { configureStore } from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage";
import zgearReducer from "../features/zgearSlice";
import userReducer from "../features/user/userSlice"
import productReducer from "../features/product/productSlice";
import adminReducer from "../features/user/adminSilce"
import authReducer from "../features/user/authSilce"
import cartReducer from "../features/product/cartSlice"
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, zgearReducer);

export const store = configureStore({
  reducer: {
    zgearReducer: persistedReducer,
    products: productReducer,
    user: userReducer,
    auth: authReducer,
    admin: adminReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

export let persistor = persistStore(store);
