import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDebates = createAsyncThunk("debates/getDebates", async (payload) => {
  const { userId, status, categories, isLiked, page, searchValue, sort } = payload;
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/debates/${userId}?status=${status}&category=${categories}&likey=${isLiked}&page=${page}&search=${searchValue}&sort=${sort}`);
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
