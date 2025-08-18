import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
//Store
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationSlice";
import blogsReducer from "./reducers/blogSlice";
import userReducer from "./reducers/userSlice";
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
