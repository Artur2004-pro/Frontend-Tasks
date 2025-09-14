import { useState, useEffect } from "react";
import Userlist from "./components/user-list";
import Adduser from "./components/add-user";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);

  // ✅ handleadd-ը սովորական function
  const handleadd = (e, user) => {
    e.preventDefault(); // form-ի refresh-ը կանխում ենք
    axios
      .post("http://localhost:4002/users", user)
      .then((response) => {
        setUsers([...users, response.data]); // նորմալ append
      });
  };

  const deleteuser = (id) => setUsers(users.filter((user) => user.id !== id));

  useEffect(() => {
    axios.get("http://localhost:4002/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="row">
      <Userlist users={users} onDeleteuser={deleteuser} />
      <Adduser onHandleadd={handleadd} />
    </div>
  );
}
