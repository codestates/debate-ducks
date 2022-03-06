import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDebates = createAsyncThunk("debates/getDebates", async (payload) => {
  // const { userId, status, categories, isLiked, page, searchValue } = payload;
  const { userId, status, categories, page, searchValue } = payload;
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/debate/list?user_id=${userId}&status=${status}&category=${categories}&page=${page}&search=${searchValue}`, {
    // const response = await axios.get(`${process.env.REACT_APP_API_URL}/debate/list`, {
    withCredentials: true,
  });
  return response.data;
});

const debatesSlice = createSlice({
  name: "debates",
  initialState: {
    loading: true,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDebates.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDebates.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getDebates.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default debatesSlice.reducer;
