import { useContext, useState } from "react";
import blogService from "../services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserContext from "../contexts/userContext";

const Blog = ({ blog }) => {
  const [user, userDispatch] = useContext(UserContext);
  const queryClient = useQueryClient();
  const [likes, setLikes] = useState(blog.likes);

  const blogDeleteMutation = useMutation({
    mutationFn: blogService.removeBlog,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((b) => b.id !== blog.id)
      );
    },
  });
  function handleRemoveBlog(blog) {
    blogDeleteMutation.mutate(blog.id);
  }
  const likeMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      );
    },
  });
  const incrementingLike = async (id, blog) => {
    const updatedBlog = { ...blog, likes: (likes || 0) + 1 };
    setLikes(updatedBlog.likes);
    delete updatedBlog.user;
    return likeMutation.mutate({ id, updatedBlog });
  };

  const [detailOfBlog, setDetailOfBlog] = useState(false);
  const blogStyle = {
    border: "2px solid black",
    padding: "1rem",
    margin: "0.5rem 0",
  };
  const checkAuthorization = () => {
    if (blog.user.username === user.username) {
      return true;
    }
    return false;
  };
  return (
    <div style={blogStyle} className="blog">
      {blog.title} {!detailOfBlog && <strong> {blog.author}</strong>}
      <button onClick={() => setDetailOfBlog(!detailOfBlog)}>
        {detailOfBlog ? "Hide" : "Show"}
      </button>
      {detailOfBlog && (
        <section>
          <strong>URL: &nbsp;</strong>
          <span>{blog.url}</span>
          <br />
          <strong>Likes:&nbsp;</strong>
          <span className="Likes">{likes}</span>&nbsp;
          <button
            onClick={() => {
              incrementingLike(blog.id, blog);
            }}
          >
            Like
          </button>
          <br />
          <strong>Author: &nbsp;</strong>
          <span>{blog.author}</span>
          <br />
          <br />
          {checkAuthorization() && (
            <button
              onClick={() => handleRemoveBlog(blog)}
              style={{ padding: "0.2rem" }}
            >
              Remove
            </button>
          )}
        </section>
      )}
    </div>
  );
};

export default Blog;
