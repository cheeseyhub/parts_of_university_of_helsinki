import { Routes, Route } from "react-router-dom";
import UsersPage from "./views/Users";
import UserInfo from "./views/UserInfo";
import Layout from "./views/Layout";
import Register from "./views/Register";
import BlogInfo from "./views/BlogInfo";
import LoginForm from "./components/LoginForm";
import BlogsForm from "./components/BlogsForm";
import Navigation from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BlogsForm />} />
          <Route path="Login" element={<LoginForm />} />
          <Route path="register" element={<Register />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:id" element={<UserInfo />} />
          <Route path="blogs/:id" element={<BlogInfo />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
