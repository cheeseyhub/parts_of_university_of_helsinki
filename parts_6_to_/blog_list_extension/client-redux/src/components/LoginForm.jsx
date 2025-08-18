import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../reducers/userSlice";
const LoginForm = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const message = useSelector((state) => state.notification);
  async function handleLogin(event) {
    event.preventDefault();
    try {
      await dispatch(userLogin(username, password));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section>
      {/* Error message display */}
      {message.includes("Error") && (
        <article>
          <h1
            style={{
              color: "red",
              backgroundColor: "lightgray",
              border: "2px solid red",
              padding: "15px",
            }}
          >
            {`${message}`}
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
