import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import sidebarReducer from "./features/layout/sidebarSlice";
import basApi from "./features/hook/baseApi";
import chatReducer from "./features/chat/chatSlice";
import socketMiddleware from "./middleware/socketMiddleware";

export const store = configureStore({
  reducer: {
    [basApi.reducerPath]: basApi.reducer,
    auth: authReducer,
    sidebar: sidebarReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(basApi.middleware, socketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
