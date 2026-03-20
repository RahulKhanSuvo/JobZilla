import type { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import type { User } from "./auth.type";
interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoading = false;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
    },
    setLoading: (state, active) => {
      state.isLoading = active.payload;
    },
  },
});
export const { setCredentials, logOut, setLoading } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectLoading = (state: RootState) => state.auth.isLoading;
