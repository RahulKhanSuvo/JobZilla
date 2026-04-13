import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
}

const initialState: SidebarState = {
  isCollapsed: false,
  isMobileOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleCollapsed: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    toggleMobileOpen: (state) => {
      state.isMobileOpen = !state.isMobileOpen;
    },
    setMobileOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileOpen = action.payload;
    },
  },
});

export const { toggleCollapsed, toggleMobileOpen, setMobileOpen } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
