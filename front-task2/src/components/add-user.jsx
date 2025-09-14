import { useEffect, useState } from "react";

export default function Adduser({ onHandleadd }) {
  const [user, setUser] = useState({ name: "", age: "" });
  const[error, setError] = useState("")
 const [fordisabled, setdisabled] = useState(false);

  return (
    <div className="col-md-4">
      <h2>add user</h2>
      <form onSubmit={(e) =>{ 
        e.preventDefault()
        if(!user.age && !user.name){
            setError("erkusne karevor en")
           // return
        }
        else if(!user.age){
            setError("age importanat");
            //return
        }
        else if(!user.name){
            setError("name is important")
            ///return
            }
         else  {
        setError("")
        onHandleadd(e, user)    }
       }
      }>
        <div>
          <label>name</label>
          <input
      //    type="txt"
            className="form-control"
            value={user.name}
            onChange={(e) =>   setUser({ ...user, name: e.target.value }) 
            
            }/>
        </div>
        <div>
          <label>age</label>
          <input
        // type="number"
            className="form-control"
             value={user.age}
             
            onChange={(e) => {
                let k = e.target.value;
                 setUser({ ...user, age: k})
                if(!isNaN(k)){
                    setError("")
                    setdisabled(false)
                }
                 else{
                    setdisabled(true);
                     setError("age is a number")
                }}
            }/>
        </div>
        <button 
        className="btn btn-outline-success my-2"
        disabled = {fordisabled}
        >save</button>
      </form>
      {error ?  <p style={{ color: "red" }}>{error}</p> : ""}
    </div>
  );
}

