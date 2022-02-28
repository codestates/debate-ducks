import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.data.id = action.payload.id;
      state.data.email = action.payload.email;
      state.data.name = action.payload.name;
      state.data.profile = action.payload.profile;
      state.data.sign_method = action.payload.sign_method;
    },
  },
});

export default userSlice.reducer;
export const { setUserInfo } = userSlice.actions;
