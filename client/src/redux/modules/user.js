import { createSlice } from "@reduxjs/toolkit";

// export const getUserInfo = createAsyncThunk("oauth/kakao", async () => {
//   const response = await axios.post(`http://localhost:8080/oauth/kakao/callback?code=${code}`);
//   return response.data;
// });

const userSlice = createSlice({
  name: "user",
  initialState: { id: null, email: null, password: null, username: null },
  reducers: {
    setUserInfo: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.username = action.payload.username;
    },
    //removeUserInfo?
  },
});

export default userSlice.reducer;
export const { setUserInfo } = userSlice.actions;
