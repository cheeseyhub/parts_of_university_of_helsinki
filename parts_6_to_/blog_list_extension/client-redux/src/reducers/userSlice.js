import { createSlice } from "@reduxjs/toolkit";
import { notification } from "./notificationSlice";
import loginService from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});
export const userLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.Login({
        username,
        password,
      });
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(notification(`${username} has logged in. Success`, 5000));

      window.localStorage.setItem("LoggedBlogUser", JSON.stringify(user));
    } catch (error) {
      dispatch(notification("Wrong Credentials. Error", 5000));
      throw error;
    }
  };
};
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
