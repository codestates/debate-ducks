import { createSlice } from "@reduxjs/toolkit";

// export const getUserInfo = createAsyncThunk("oauth/kakao", async () => {
//   const response = await axios.post(`http://localhost:8080/oauth/kakao/callback?code=${code}`);
//   return response.data;
// });

const userSlice = createSlice({
  name: "user",
  initialState: { id: null, email: null, name: null, profile: null, sign_method: null },
  reducers: {
    setUserInfo: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.profile = action.payload.profile;
      state.sign_method = action.payload.sign_method;
    },
    //removeUserInfo? 그냥 db에서 삭제.
  },
});

export default userSlice.reducer;
export const { setUserInfo } = userSlice.actions;
