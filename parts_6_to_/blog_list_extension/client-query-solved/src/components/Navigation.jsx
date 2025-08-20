import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import { useContext } from "react";

const linkStyle = {
  fontWeight: "bolder",
  fontSize: "large",
  textDecoration: "none",
  border: "1px solid black",
  padding: "0.2rem",
  margin: "0 5px",
};
const Navigation = () => {
  const [user, userDipatch] = useContext(UserContext);
  return (
    <div>
      <section>
        <Link to="/" style={linkStyle}>
          Home
        </Link>

        <Link to="/users" style={linkStyle}>
          Users
        </Link>
        {user && (
          <Link to={`/users/${user.id}`} style={linkStyle}>
            Your Blogs.
          </Link>
        )}
        {!user && (
          <Link to="/Login" style={linkStyle}>
            Login
          </Link>
        )}
      </section>
      <br />
    </div>
  );
};

export default Navigation;
