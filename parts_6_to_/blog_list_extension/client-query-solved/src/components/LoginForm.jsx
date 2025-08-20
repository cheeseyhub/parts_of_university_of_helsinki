import { useState, useEffect, useContext } from "react";
import loginService from "../services/login";
import NotificationContext from "../contexts/notificationContext";
import UserContext from "../contexts/userContext";
import blogService from "../services/blogs";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [notificationState, notificationDispatch] =
    useContext(NotificationContext);
  const navigate = useNavigate();
  //Login credentials
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, userDispatch] = useContext(UserContext);
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
      navigate("/");
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
  return (
    <section>
      {/* Error message display */}
      {notificationState.includes("Error") && (
        <article>
          <h1
            style={{
              color: "red",
              backgroundColor: "lightgray",
              border: "2px solid red",
              padding: "15px",
            }}
          >
            {`${notificationState}`}
          </h1>
        </article>
      )}

      <form onSubmit={handleLogin}>
        <h1>Login Form</h1>
        <article>
          <label htmlFor="username">Username</label>&nbsp;
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            placeholder="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </article>
        <br />
        <article>
          <label htmlFor="password">Password</label>&nbsp;
          <input
            type="text"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </article>
        <br />
        <button type="submit">Login</button>
      </form>
    </section>
  );
};
export default LoginForm;
