import { Link } from "react-router-dom";

const UserItem = ({user}) => {
    return <div className="user-item">
        <b>{user.name}</b>
        <Link to={`/users/${user.id}`}>Details</Link>
    </div>
}

export default UserItem;