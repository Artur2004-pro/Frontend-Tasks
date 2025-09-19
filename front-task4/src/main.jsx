import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserList from "./componenets/user-list.jsx";
import AddUser from './componenets/add-user.jsx';
import UserDetails from "./componenets/user-detail.jsx";

const router = createBrowserRouter([
  {path: "", element: <UserList />},
  {path: "add", element: <AddUser />},
  {path: "users/:id", element: <UserDetails />},

])
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
