import { useNavigate, useParams } from "react-router-dom";
import blogService from "../services/blogs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useContext, useState } from "react";
import UserContext from "../contexts/userContext";
const BlogInfo = () => {
  const [user, userDispatch] = useContext(UserContext);
  const { id } = useParams();
  const [likes, setLikes] = useState(0);
  const navigate = useNavigate();
  const [commentState, setComment] = useState("");
  const { data, isPending } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
  });

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

  const addCommentMutation = useMutation({
    mutationFn: blogService.comment,
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (isPending) {
    return <div>...Loading</div>;
  }

  const blog = data.find((b) => b.id === id);
  const incrementingLike = () => {
    const updatedBlog = {
      ...blog,
      likes: (likes > 0 ? likes : blog.likes) + 1,
    };
    setLikes(updatedBlog.likes);
    delete updatedBlog.user;
    return likeMutation.mutate({ id, updatedBlog });
  };
  function handleRemoveBlog() {
    blogDeleteMutation.mutate(id);
    navigate("/");
  }
  const checkAuthorization = () => {
    if (blog.user.username === user.username) {
      return true;
    }
    return false;
  };
  function addComment() {
    if (commentState === "") {
      return;
    }
    let updatedBlog = { ...blog };
    updatedBlog.comments.push(commentState);
    addCommentMutation.mutate(updatedBlog);
    setComment("");
  }

  return (
    <div>
      <br />
      <h2>{blog.title}</h2>
      <section>
        <strong>URL: &nbsp;</strong>
        <span>{blog.url}</span>
        <br />
        <strong>Likes:&nbsp;</strong>
        <span className="Likes">{likes > 0 ? likes : blog.likes}</span>&nbsp;
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
        {user && checkAuthorization() && (
          <button
            onClick={() => handleRemoveBlog(blog)}
            style={{ padding: "0.2rem" }}
          >
            Remove
          </button>
        )}
        <br />
        <br />
        <h3>Comments</h3>
        <input
          type="text"
          name="comment"
          value={commentState}
          onChange={({ target }) => setComment(target.value)}
        />
        <button onClick={addComment}>Comment</button>
        <ul>
          {blog.comments.length !== 0 ? (
            blog.comments.map((comment, index) => {
              return <li key={index}>{comment}</li>;
            })
          ) : (
            <li>No Comments</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default BlogInfo;
