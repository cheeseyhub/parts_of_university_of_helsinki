import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserContext from "../contexts/userContext";
import blogService from "../services/blogs";

const Layout = () => {
  const [user, userDispatch] = useContext(UserContext);
  if (user) {
    blogService.setToken(user.token);
  }
  const navigate = useNavigate();
  function handleLogout() {
    userDispatch({ type: "CLEAR_USER" });
    navigate("/Login");
  }
  return (
    <div>
      {user !== null && (
        <section>
          <strong> {user?.username} logged in</strong>
          <button onClick={handleLogout}>Logout</button>
        </section>
      )}
      <Outlet />
    </div>
  );
};
export default Layout;
