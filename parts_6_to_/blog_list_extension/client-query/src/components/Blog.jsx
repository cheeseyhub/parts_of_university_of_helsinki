const Blog = ({ blog }) => {
  const blogStyle = {
    border: "2px solid black",
    padding: "1rem",
    margin: "0.5rem 0",
  };
  return (
    <div style={blogStyle} className="blog">
      {blog.title}
    </div>
  );
};

export default Blog;
