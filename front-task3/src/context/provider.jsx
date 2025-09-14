import { Children, useEffect, useState } from "react"
import { UserContext } from "./user-context"
import axios from "axios"

export const DataProvider = ({children}) =>{

const [users, setUsers] =useState([])
useEffect(() =>{
axios
.get("http://localhost:4002/users")
.then(r =>{
    setUsers(r.data)
})
.catch(err => console.error("Axios error", data))
},[])


const handleDelete = (id) => {
  axios.delete(`http://localhost:4002/users/${id}`)
    .then(() => {
      setUsers(prev => prev.filter(item => item.id !== id));
    })
    .catch(err => console.error("Axios error:", err));
};
const handaleAdd = data =>{
    axios.post("http://localhost:4002/users/", {...data, id: Date.now()})
    .then(() => {
        setUsers(prev =>[...prev, {...data,}])
    })
    .catch(err => console.error("axios error:",err ))
}
//const handaleAdd = data => setUsers([...useerrs, {...data, id: Date.now()}])
    return<>
    <UserContext.Provider value={{
        users, 
        onDelete: handleDelete,
        onAdd: handaleAdd
        }}>
{children}
    </UserContext.Provider>
    </>
}