import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import userService from "../services/users";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: userService.register,
    onSuccess: () => {
      setMessage("You are registered ! ");
      setTimeout(() => {
        setMessage("");
        navigate("/");
      }, 5000);
    },
    onError: (error) => {
      setMessage(error.response?.data?.error);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    },
  });

  function handleRegister(event) {
    event.preventDefault();
    registerMutation.mutate({ username, name, password });
  }
  return (
    <section>
      {message && (
        <div
          style={{
            color: "red",
            border: "2px solid red",
            padding: "1rem",
            fontSize: "larger",
            backgroundColor: "lightgray",
            textTransform: "uppercase",
          }}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleRegister}>
        <h1>Register Form</h1>
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
        <article>
          <label htmlFor="name">Name</label>&nbsp;
          <input
            type="text"
            name="Name"
            id="Name"
            placeholder="Name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </article>
        <br />
        <button type="submit">Login</button>
      </form>
    </section>
  );
};
export default Register;
