import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveDataUser(state, action) {
      state.user = action.payload;
    },
    logOut(state) {
      state.user = null;
      localStorage.removeItem("persist:root");
    },
  },
});

export const { saveDataUser, logOut } = userSlice.actions;
export default userSlice.reducer;
