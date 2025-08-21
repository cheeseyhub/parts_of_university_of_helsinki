import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import userService from "../services/users.js";
import { useQuery } from "@tanstack/react-query";
const UserInfo = () => {
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["usersData"],
    queryFn: userService.getAll,
  });
  if (isPending) return <div>...Loading</div>;

  const user = data.filter((obj) => obj.id === id)[0];
  return (
    <div>
      <h3>{user.username}</h3>
      <strong>Added blogs</strong>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserInfo;
