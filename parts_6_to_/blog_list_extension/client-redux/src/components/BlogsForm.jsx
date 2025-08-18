import Blog from "./Blog";
import Toggalable from "./Toggalable";
import { useState } from "react";
import { likeBlog } from "../reducers/blogSlice";
import { useDispatch } from "react-redux";

function logout() {
  window.localStorage.clear();
  window.location.reload();
}
const BlogsForm = ({
  message,
  status,
  user,
  handleCreatingBlog,
  blogs,
  blogFormRef,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  /* Handle incrementingLike */
  const incrementingLike = async (blog) => {
    dispatch(likeBlog(blog, blog.id));
  };

  /* Handle incrementingLike */
  return (
    <section>
      {/* sucess message display */}
      {status === "Success" && (
        <article>
          <h1
            className="message"
            style={{
              color: "green",
              backgroundColor: "lightgray",
              border: "2px solid green",
              padding: "15px",
            }}
          >
            {`${message}`}
          </h1>
        </article>
      )}
      {/* Error message display */}
      {status === "Error" && (
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
      <h1>Logged in {`${user.username}`}</h1>
      <button onClick={logout}>Logout</button>
      <h3>Create a new Blog</h3>
      <Toggalable buttonLabel="New Blog" ref={blogFormRef}>
        <form
          onSubmit={(event) => handleCreatingBlog(event, title, author, url)}
        >
          <section>
            <label htmlFor="title">
              Title: &nbsp;
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title for the blog"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </label>
          </section>
          <br />
          <section>
            <label htmlFor="author">
              author: &nbsp;
              <input
                type="text"
                name="author"
                id="title"
                placeholder="Author of the blog"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </label>
          </section>
          <br />
          <section>
            <label htmlFor="url">
              Url: &nbsp;
              <input
                type="text"
                name="url"
                id="title"
                placeholder="Url for the blog"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </label>
          </section>
          <br />
          <button type="submit">Create</button>
        </form>
      </Toggalable>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} incrementingLike={incrementingLike} />
      ))}
    </section>
  );
};
export default BlogsForm;
