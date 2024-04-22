import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDrag, useDrop } from 'react-dnd'

function ListTask({ tasks, setTasks }) {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const fTodods = tasks.filter((task) => task.status === "todo");
    const fInProgress = tasks.filter((task) => task.status === "inprogress");
    const fClosed = tasks.filter((task) => task.status === "closed");

    setTodos(fTodods);

    setInProgress(fInProgress)
    setClosed(fClosed)
  }, [tasks])

  const statuses = ["todo", "inprogress", "closed"];

  return (
    <div className='flex gap-20'>
      {statuses.map((value, index) => {
        return <Section status={value} key={index} setTasks={setTasks} tasks={tasks}
          todos={todos} inProgress={inProgress} closed={closed}
        />
      })}
    </div>
  )
}

export default ListTask



const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  
  const [{isOver}, drop] = useDrop(() => ({
    accept: "task",
     drop:(item)=>addItemToSection(item.id),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  let text = "Todos";
  let bg = "bg-slate-500"
  let tasksToMap = todos

  if (status == "inprogress") {
    text = "In Progress"
    bg = "bg-purple-500"
    tasksToMap = inProgress
  } if (status == "closed") {
    text = "Closed"
    bg = "bg-green-500"
    tasksToMap = closed
  }

  const addItemToSection=(id) => {
    console.log("🚀 ~ addItemToSection ~ id:", id,status)

    setTasks((prev)=>{
      const mTas=prev.map((t)=>{
        if(t.id == id){
           return {...t,status}
        }
        return t;
      })
      localStorage.setItem("tasks",JSON.stringify(mTas))
      toast.success("Toast status changed",{icon:"😊"})
      return mTas;
    })
   
  }

  return <>
    <div className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-100":""}`} ref={drop}>

      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 && tasksToMap.map((task) => {
        return <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
      })}
    </div>
  </>
}

const Header = ({ text, bg, count }) => {
  console.log("🚀 ~ Header ~ text:", text)
  return <>
    <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
      {text}
      <div className='ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center'>
        {count}
      </div>
    </div>
  </>
}


const Task = ({ task, tasks, setTasks }) => {

  const [{isDragging}, drag] = useDrag(() => ({
    type: "task",
    item:{id:task.id},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  console.log("🚀 ~ const[{isDragging},drag]=useDrag ~ isDragging:", isDragging)
  

  const handleRemove = (id) => {
    const ftasks = tasks.filter((task) => task.id !== id)
    localStorage.setItem("tasks", JSON.stringify(ftasks))
    setTasks(ftasks);
    toast.success("REmove successfully")
  }
  return <>
    <div 
    ref={drag}
    className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${isDragging ? "opacity-25":"opacity-100"}`}>
      <p>
        {task?.name}
        <button className="absolute bottom-1 right-1 text-slate-400" onClick={() => {
          handleRemove(task.id)
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

        </button>
      </p>
    </div>
  </>
}