import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getColumns = createAsyncThunk("columns/getColumns", async (payload) => {
  const { userId, categories, isLiked, page, searchValue, sort } = payload;
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/columns/${userId}?category=${categories}&likey=${isLiked}&page=${page}&search=${searchValue}&sort=${sort}`);
  return response.data;
});

const columnsSlice = createSlice({
  name: "columns",
  initialState: {
    loading: true,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getColumns.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getColumns.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getColumns.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default columnsSlice.reducer;
