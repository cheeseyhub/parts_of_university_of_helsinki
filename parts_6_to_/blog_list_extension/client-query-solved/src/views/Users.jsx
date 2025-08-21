import { useQuery } from "@tanstack/react-query";
import userService from "../services/users.js";
import { Link } from "react-router-dom";
const UsersPage = () => {
  const { data } = useQuery({
    queryKey: ["usersData"],
    queryFn: userService.getAll,
  });
  const usersData = data;
  return (
    <div>
      <section>
        <h2>Users</h2>
        <table className="table table-striped table-hover table-bordered table-sm">
          <thead>
            <tr className="table-dark">
              <th scope="col">User</th>
              <th scope="col">Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {usersData?.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.username}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default UsersPage;
