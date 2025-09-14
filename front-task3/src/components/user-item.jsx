import { useContext } from "react" 
import { UserContext } from "../context/user-context"
import  "../css/User-item.css";
 export default function UserItem({user}){ 
    const {onDelete} = useContext(UserContext)
     return<div className="t">
         <p>{user.name} {user.age} years old</p>
          <button className="btn btn-dark btn-sm" 
          onClick={() => onDelete(user.id)} >
            Delete</button> </div> }