import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    hideLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { setUser, reloadUserData } = userSlice.actions;
