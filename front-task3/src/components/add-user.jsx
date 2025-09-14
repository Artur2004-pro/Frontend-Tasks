import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { UserContext } from "../context/user-context"

export default function AddUser(){
 const {register, handleSubmit, formState: {errors}, reset} = useForm()
 const{onAdd} = useContext(UserContext)
 const handaleAdd = data =>{
    console.log(data)
    onAdd(data)
    reset();
 }
    return<div className="col-md-4">
    <h1>Add user</h1>
    <form onSubmit={handleSubmit(handaleAdd)}>


        <div>
            {errors.level && <p className="text-danger">{errors.level.message}</p>}
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
            <label>first name</label>
            <input
            className="form-control"
              {...register("name", {required: "please fill the name"})}    
            />
        </div>
         <div>
            <label>age</label>
            <input
            className="form-control"
           {...register("age",  {setValueAs: p => +p})}            
            />
        </div>
         <div>
             
            <label>level</label>
            
            <select className="form-control"
            {...register("level",  {required: "please fill the level"})}
            >
            <option></option>
            <option>junior</option>
            <option>middle</option>
            <option>senior</option>
            
            </select>
           
        </div>
        <div>
            <button className="btn btn-outline-success btn-sm my-2">Save</button>
        </div>
    </form>
    </div>
}
