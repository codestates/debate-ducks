import { createSlice } from "@reduxjs/toolkit";

const exceedModalSlice = createSlice({
  name: "exceedModal",
  initialState: { isOpen: false },
  reducers: {
    onOffModal: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export default exceedModalSlice.reducer;
export const { onOffModal } = exceedModalSlice.actions;
