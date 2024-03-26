import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);  //Hold all the arrays
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    const todoString=localStorage.getItem("todos");
    if (todoString) {
      const todos=JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, [])
  
  const saveTodoL=()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const toggleFinished=()=>{
    setShowFinished(!showFinished);
  }

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveTodoL();
  }
  const handleEdit = (e, id) => {
    const t=todos.filter(i=>i.id===id);
    setTodo(t[0].todo);
    const newTodos=todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos);
    saveTodoL();
  }
  const handleDelete = (e, id) => {
    // console.log(`The id is ${id}`);
    const userConfirm=confirm("Do you Want to Delete this Todo?");
    if (userConfirm){
      const newTodos=todos.filter(item=>{
        return item.id!==id;
      });
      setTodos(newTodos);
      console.log("Deleted");
    }
    else{
      console.log("Do Nothing!");
    }
    saveTodoL();
  }
  const handleChange = (e) => {
    setTodo(e.target.value);
  }
  const handleCheckbox = (e) => {
    const id=e.target.name;
    const index=todos.findIndex(item=>{
      return item.id===id;
    })
    const newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTodoL();
  }

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto my-5 rounded-xl p-5 bg-black min-h-[80vh] md:w-[40%] mx-8 text-white">
        <h1 className='font-bold text-xl text-center'>iTask - Manage your Todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-5">
          <h2 className='font-bold text-xl '>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5 py-1 bg-[#181515]' />
          <button onClick={handleAdd} disabled={todo.length<1} className='bg-[#351d52] p-2 py-1 mx-3 rounded-md text-sm font-bold text-white hover:bg-violet-950 disabled:bg-[#351d52]'>Save</button>
          </div>
        </div>
        <input className='mb-5' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='font-bold text-xl '>Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className='m-3'>No Todos To Display</div> }
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full my-3 justify-between">
              <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div style={{textDecorationColor: '#4a71d8', textDecorationThickness: "3px"}} className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-[#351d52] p-2 py-1 mx-1 rounded-md text-sm font-bold text-white hover:bg-violet-950'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-[#351d52] p-2 py-1 mx-1 rounded-md text-sm font-bold text-white hover:bg-violet-950'><MdDeleteForever /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
