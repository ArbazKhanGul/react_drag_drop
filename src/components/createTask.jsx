import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

function CreateTask({tasks,setTasks}) {
    const [task,setTask]=useState({
        id:"",
        name:"",
        status:"todo"
    })

    console.log("🚀 ~ createTask ~ task:", task)
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(task.name.length < 3) return toast.error("A task must have more than 3 character")

        if(task.name.length > 100) return toast.error("A task must not more than 100 character")

        setTasks((prev)=>{
            const list =[...tasks,task];
            localStorage.setItem("tasks",JSON.stringify(list));
            return list;
        })
        
        toast.success("Task Created");

        setTask({
            id:"",
            name:"",
            status:"todo"
        })
    }
  return (

<form onSubmit={handleSubmit}>
    <input type="text" name="" id="" className='border-2 border-slate-300  rounded-md
    mr-4 h-12 w-64 px-1'
    value={task.name}
    onChange={(e)=>
    setTask({...task,id:uuidv4(),name:e.target.value})}/>
<button className='bg-cyan-500 rounded-md px-4 h-12 text-white'>Create</button>
</form>
  )
}

export default CreateTask