import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import sidebarReducer from "./features/layout/sidebarSlice";
import basApi from "./features/hook/baseApi";
export const store = configureStore({
  reducer: {
    [basApi.reducerPath]: basApi.reducer,
    auth: authReducer,
    sidebar: sidebarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(basApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
