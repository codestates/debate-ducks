import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getColumnRankings = createAsyncThunk("columnRankings/getColumnRankings", async ({ userId }) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/columns/ranking/${userId}`, { withCredentials: true });
  return response.data;
});

const columnRankingsSlice = createSlice({
  name: "columnRankings",
  initialState: {
    loading: true,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getColumnRankings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getColumnRankings.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getColumnRankings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default columnRankingsSlice.reducer;
