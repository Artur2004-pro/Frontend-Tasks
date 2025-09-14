import { useState } from 'react'
import UserList from './components/user-list'
import AddUser from './components/add-user'
import { UserContext } from './context/user-context'
import { DataProvider } from './context/provider'
export default function App(){
 // console.log(UserContext);
const [users, setUsers] =useState([
{id:10, name: "Noro", age:34, level: "intern"},
{id:0, name: "Maro", age:10, level: "senior"},
{id:14, name: "Saro", age:60, level: "senior"},
{id:1, name: "Taron", age:30, level: "junior"},
])
  return <>
  <div className='row container'>
    <DataProvider>
      <UserList/>
      <AddUser/>
    </DataProvider>
  </div>
  </>
}