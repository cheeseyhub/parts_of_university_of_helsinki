import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { notification } from "./notificationSlice";
const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      return [...state, action.payload];
    },
    incrementLikes(state, action) {
      return state.map((blog) =>
        blog.id === action.payload ? { ...blog, likes: blog.likes + 1 } : blog
      );
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(sortedBlogs));
  };
};
export const createBlog = (title, author, url) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create({ title, author, url });
      dispatch(
        notification(
          `A new blog ${title} of ${author} has been added. Success`,
          5000
        )
      );
      dispatch(addBlog(newBlog));
    } catch (error) {
      dispatch(notification(`${error.response.data.error}. Error`, 5000));
      throw error;
    }
  };
};
export const likeBlog = (blog, id) => {
  return async (dispatch) => {
    dispatch(incrementLikes(id));
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    delete updatedBlog.user;
    await blogService.update(id, updatedBlog);
  };
};
export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.removeBlog(id);
    dispatch(removeBlog(id));
  };
};
export const { setBlogs, addBlog, incrementLikes, removeBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
