import { Link } from "react-router-dom";
import Blog from "./Blog";
import Toggalable from "./Toggalable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NotificationContext from "../contexts/notificationContext";
import { useState, useContext } from "react";
import blogService from "../services/blogs";
const BlogsForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const queryClient = useQueryClient();
  const [notificationState, notificationDispatch] =
    useContext(NotificationContext);
  const { data } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });
  const blogs = data;

  const blogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], [...blogs, newBlog]);
      notificationDispatch({
        type: "SET",
        payload: `A new blog ${newBlog.title} by ${newBlog.author} added`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
      setTitle("");
      setAuthor("");
      setUrl("");
    },
    onError: (error) => {
      notificationDispatch({ type: "ERROR", payload: error.message });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    },
  });
  //New Blog properties
  function handleCreatingBlog(event, title, author, url) {
    event.preventDefault();
    blogMutation.mutate({ title, author, url });
  }

  return (
    <section>
      {/* sucess message display */}
      {notificationState.includes("Success") && (
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
            {`${notificationState}`}
          </h1>
        </article>
      )}
      {/* Error message display */}
      {notificationState.includes("Error") && (
        <article>
          <h1
            style={{
              color: "red",
              backgroundColor: "lightgray",
              border: "2px solid red",
              padding: "15px",
            }}
          >
            {`${notificationState}`}
          </h1>
        </article>
      )}
      <h3>Create a new Blog</h3>
      <Toggalable buttonLabel="New Blog">
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
      {blogs &&
        blogs.map((blog) => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            {" "}
            <Blog blog={blog} />
          </Link>
        ))}
    </section>
  );
};
export default BlogsForm;
