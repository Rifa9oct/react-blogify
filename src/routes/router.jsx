import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import CreateBlog from "../pages/CreateBlog";
import SingleBlog from "../pages/SingleBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/createBlog",
        element: <PrivateRoute><CreateBlog></CreateBlog></PrivateRoute>
      },
      {
        path: "/singleBlog/:id",
        element: <SingleBlog></SingleBlog>,
      },
      {
        path: "/profile/:id",
        element: <Profile></Profile>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
    ]
  },
]);

export default router;