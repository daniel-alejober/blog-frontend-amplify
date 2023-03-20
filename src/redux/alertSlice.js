import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    show: false,
    color: "",
    message: "",
  },
  reducers: {
    showAlert(state, action) {
      state.show = true;
      state.color = action.payload.color;
      state.message = action.payload.message;
    },
    hideAlert(state) {
      state.show = false;
      state.color = "";
      state.message = "";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
