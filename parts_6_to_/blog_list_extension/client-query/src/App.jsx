import { useState, useEffect, useRef, useContext } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogsForm from "./components/BlogsForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NotificationContext from "./contexts/notificationContext";
import UserContext from "./contexts/userContext";

const App = () => {
  const queryClient = useQueryClient();
  const [notificationState, notificationDispatch] =
    useContext(NotificationContext);
  const { data } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });
  const blogs = data;

  const blogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], [...blogs, newBlog]);
      notificationDispatch({
        type: "SET",
        payload: `A new blog ${newBlog.title} by ${newBlog.author} added`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    },
    onError: (error) => {
      notificationDispatch({ type: "ERROR", payload: error.message });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    },
  });
  //Login credentials
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, userDispatch] = useContext(UserContext);
  //New Blog properties
  const blogFormRef = useRef();
  useEffect(() => {
    userDispatch({ type: "GET_USER" });
    if (user) {
      blogService.setToken(user.token);
    }
  }, []);
  const userMutation = useMutation({
    mutationFn: loginService.Login,
    onSuccess: (loggedInUser) => {
      userDispatch({ type: "SET_USER", payload: loggedInUser });
      blogService.setToken(loggedInUser.token);
      setUsername("");
      setPassword("");
      notificationDispatch({
        type: "SET",
        payload: `${username} has logged in.`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    },
    onError: (error) => {
      notificationDispatch({ type: "ERROR", payload: error.message + "Error" });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    },
  });
  async function handleLogin(event) {
    event.preventDefault();
    return userMutation.mutate({ username, password });
  }
  function handleCreatingBlog(event, title, author, url) {
    event.preventDefault();
    blogMutation.mutate({ title, author, url });
  }

  //loginForm
  //logout
  return user === null ? (
    <LoginForm
      handleLogin={handleLogin}
      password={password}
      username={username}
      setPassword={setPassword}
      setUsername={setUsername}
    />
  ) : (
    <BlogsForm
      status={
        notificationState.includes("Error")
          ? "Error"
          : notificationState.includes("Success")
          ? "Success"
          : "nothing"
      }
      message={notificationState}
      blogs={blogs ? blogs : []}
      handleCreatingBlog={handleCreatingBlog}
      blogFormRef={blogFormRef}
    />
  );
};

export default App;
