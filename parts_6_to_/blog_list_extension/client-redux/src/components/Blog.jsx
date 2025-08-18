import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog } from "../reducers/blogSlice";

/*Handle Removing blogs function */
const handleRemoveBlog = async (dispatch, blog) => {
  if (confirm(`Do you want to remove ${blog.title} blog`)) {
    dispatch(deleteBlog(blog.id));
  }
};
/*Handle Removing blogs function */

const Blog = ({ blog, incrementingLike }) => {
  const blogLikes = blog.likes;
  const dispatch = useDispatch();

  let loggedInUser = useSelector((state) => state.user).username;
  const [detailOfBlog, setDetailOfBlog] = useState(false);
  const blogStyle = {
    border: "2px solid black",
    padding: "1rem",
    margin: "0.5rem 0",
  };
  const checkAuthorization = () => {
    if (blog.user.username === loggedInUser) {
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
          <span className="Likes">{blogLikes}</span>&nbsp;
          <button
            onClick={() => {
              incrementingLike(blog);
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
              onClick={() => handleRemoveBlog(dispatch, blog)}
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
