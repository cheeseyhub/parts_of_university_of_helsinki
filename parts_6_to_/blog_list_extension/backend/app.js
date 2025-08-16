const express = require("express");
const { URL } = require("./utils/config");
const app = express();
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogRouter");
const middlewares = require("./utils/middlewares");
const usersRouter = require("./controllers/usersRouter");
const LoginRouter = require("./controllers/loginRouter");

app.use(cors());
app.use(express.json());
app.use(middlewares.requestLogger);
app.use(middlewares.tokenExtracter);
mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Error connecting to database");
  });
app.get("/", (request, response) => {
  response.send("<h1>This is the root</h1>");
});
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/login", LoginRouter);
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}
app.use(middlewares.unknownEndPoint);
app.use(middlewares.errorHandler);
module.exports = app;
