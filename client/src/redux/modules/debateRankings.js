import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDebateRankings = createAsyncThunk("debateRankings/getDebateRankings", async ({ userId }) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/debates/ranking/${userId}`, { withCredentials: true });
  return response.data;
});

const debateRankingsSlice = createSlice({
  name: "debateRankings",
  initialState: {
    loading: true,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDebateRankings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDebateRankings.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getDebateRankings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default debateRankingsSlice.reducer;
