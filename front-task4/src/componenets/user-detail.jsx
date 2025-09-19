import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const UserDetails = () => {
    const {id} = useParams();
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:4002/users/${id}`)
        .then(res => setUser(res.data));
    }, [id]);
    return <>
        {
            user && <div className="user-details">
                <b>{user.name}</b>
                <b>{user.age}</b>
                <b>{user.id}</b>
            </div>
        }
        <Link to={"/"}>Back to Users</Link>
    </>
}
export default UserDetails;