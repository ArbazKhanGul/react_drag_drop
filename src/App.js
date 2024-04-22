import { useEffect, useState } from "react"
import CreateTask from "./components/createTask";
import ListTask from "./components/listTask";
import { Toaster } from "react-hot-toast";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default function App() {
  const [tasks,setTasks]=useState([]);

  useEffect(()=>{
    setTasks(JSON.parse(localStorage.getItem("tasks")) || [] )
  },[])

  return (
    <>
    <DndProvider backend={HTML5Backend}>
    <Toaster/>
    <div className="bg-slate-100 w-screen h-screen flex flex-col text-center
    items-center gap-16 pt-20">
      <CreateTask tasks={tasks} setTasks={setTasks}/>
      <ListTask tasks={tasks} setTasks={setTasks}/>
    </div>
    </DndProvider>
    </>
  )
}