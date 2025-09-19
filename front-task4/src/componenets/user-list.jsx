import axios from "axios";
import { useEffect, useState } from "react";
import UserItem from "./user-item.jsx"
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4002/users/")
      .then((res) => setUsers(res.data));
  }, []);
  return (
    <>
      {users.length > 0 ? (
        users.map((user) => <UserItem key={user.id} user={user}/>)
      ) : (
        <h1>users</h1>
      )}
      <Link to={"/add"}>Add user</Link>
    </>
  );
};

export default UserList;
