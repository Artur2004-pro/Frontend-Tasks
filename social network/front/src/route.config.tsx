import { createBrowserRouter } from "react-router-dom";
import { Signup } from "./pages/general/signup.tsx";
import { Login } from "./pages/general/login.tsx";
import { Profile } from "./pages/auth/profile.tsx";
import { Layout } from "./pages/auth/layout.tsx";
import { Posts } from "./pages/auth/posts.tsx";
import { Settings } from "./pages/settings/setings.tsx";
import { UpdateLogin } from "./pages/settings/UpdateLogin.tsx";
import { UpdatePassworduser } from "./pages/settings/UpdatePassword.tsx";
import { UpdateStatus } from "./pages/settings/updated.tsx";
import { Search } from "./pages/auth/search.tsx";
import { Account } from "./pages/auth/account.tsx";
import { AddPost } from "./pages/auth/add-post.tsx";
import { Followers } from "./pages/auth/folowers.tsx";
import { Following } from "./pages/auth/folowing.tsx";
import { PostComment } from "./pages/auth/post-comment.tsx";
import { ViewPost } from "./pages/auth/view-post.tsx";

export const router = createBrowserRouter([
  { path: "", element: <Signup /> },
  { path: "login", element: <Login /> },
  //   nested routing
  {
    path: "profile",
    element: <Layout />,
    children: [
      { path: "", element: <Profile /> },
      { path: "posts", element: <Posts /> },
      {  path: "setings", element: <Settings />,},
      { path: "update-login", element: <UpdateLogin /> },
      {path: "update-password", element: <UpdatePassworduser/>},
      {path: "succses-update/login|password", element:<UpdateStatus/>},
      {path: "search", element: <Search/>},
      {path: ":id", element: <Account/>},
      {path: "add", element: <AddPost/>},
      {path: "posts", element: <Posts/>},
      {path: "add/comment/:id", element: <PostComment/>},
      {path: "followers", element: <Followers/>},
      {path: "following", element: <Following/>},
      {path: "posts/:id", element: <ViewPost />},
    ],
  },
]);
