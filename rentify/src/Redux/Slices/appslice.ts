import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  enableLogin: false,
  enablePropAdd: true,
  loginReason: "",
  user: {
    first_name: "Crazy",
    last_name: "Robert",
    date_joined: "2024-05-19T13:00:09.423272Z",
    email: "seller@rentify.com",
    role: "seller",
    contact: "1234567890",
    isActive: true,
  },
};
const appSlice = createSlice({
  name: "app-slice",
  initialState,
  reducers: {
    appLoading: (state, action) => {
      state.loading = action.payload.loadVal;
    },
    loadUser: (state, action) => {
      state.user = { ...action.payload };
    },
    logoutUser: (state) => {
      state.user = { ...initialState.user };
    },
    setEnableLogin: (state, action) => {
      state.enableLogin = action.payload.enable;
      state.loginReason = action.payload.loginReason || "";
    },
  },
});

export default appSlice.reducer;

export const { appLoading, loadUser, setEnableLogin, logoutUser } =
  appSlice.actions;
