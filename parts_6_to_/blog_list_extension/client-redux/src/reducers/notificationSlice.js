import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",

  reducers: {
    clearNotification(state, action) {
      return "";
    },
    setNotification(state, action) {
      return action.payload;
    },
  },
});
export const notification = (message, time) => {
  return (dispatch) => {
    dispatch(setNotification(message));

    setTimeout(() => {
      dispatch(clearNotification());
    }, time);
  };
};

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
