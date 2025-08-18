import { useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import BlogsForm from "./components/BlogsForm";
import blogService from "./services/blogs";

import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs, createBlog } from "./reducers/blogSlice";
import { setUser } from "./reducers/userSlice";
const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const message = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //New Blog properties
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("LoggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  }, []);
  async function handleCreatingBlog(event, title, author, url) {
    event.preventDefault();
    try {
      await dispatch(createBlog(title, author, url));
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
  }, [dispatch, user]);

  //loginForm
  //logout
  return user === null ? (
    <LoginForm />
  ) : (
    <BlogsForm
      user={user}
      status={
        message.includes("Error")
          ? "Error"
          : message.includes("Success")
          ? "Success"
          : "Nothing"
      }
      message={message}
      blogs={blogs ? blogs : []}
      handleCreatingBlog={handleCreatingBlog}
      blogFormRef={blogFormRef}
    />
  );
};

export default App;
