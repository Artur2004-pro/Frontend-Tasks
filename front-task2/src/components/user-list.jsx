import axios from 'axios' 
import { useState } from 'react';
export default function Userlist({ users, onDeleteuser }) {
const [input, setInput] = useState(false)
 const fordelete = id => {
  axios
  .delete(`http://localhost:4002/users/${id}`)
  .then(response =>{
    onDeleteuser(id);
  })
 }
  return (
    <div className="col-md-8">
      <h2>User list</h2>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>age</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button className="btn btn-danger btn-sm mx-2"
                onClick={() => fordelete(user.id)}
                >Delete</button>
                <button className="btn btn-success btn-sm mx-2">Edit</button>
            
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> 



  )   
  
}
 