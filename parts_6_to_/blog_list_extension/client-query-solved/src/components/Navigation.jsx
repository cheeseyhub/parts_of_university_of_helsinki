import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import { useContext } from "react";

const Navigation = () => {
  const [user, userDipatch] = useContext(UserContext);
  return (
    <div>
      <section className="mt-4">
        <Link to="/" className="btn btn-primary me-2">
          Home
        </Link>

        <Link to="/users" className="btn btn-primary me-2">
          Users
        </Link>
        {user && (
          <Link to={`/users/${user.id}`} className="btn btn-primary me-2">
            Your Blogs.
          </Link>
        )}
        {!user && (
          <Link to="/Login" className="btn btn-primary me-2">
            Login
          </Link>
        )}
      </section>
      <br />
    </div>
  );
};

export default Navigation;
