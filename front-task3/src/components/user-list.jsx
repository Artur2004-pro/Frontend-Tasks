import { useContext } from "react"
import { UserContext } from "../context/user-context"
import UserItem from "./user-item"

export default function UserList(){
const {users} = useContext(UserContext)
//console.log(users)
    return <div className="col-md-8">
    <h1>User list</h1>

    <div className="row">
{
users.map(user => <UserItem key = {user.id} user ={user}/>)
}
    </div>
    </div>
   
}