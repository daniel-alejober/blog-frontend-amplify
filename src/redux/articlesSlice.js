import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    saveArticles(state, action) {
      state.articles = action.payload;
    },
  },
});

export const { saveArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
