import React, { useEffect, useState } from 'react'
import editsvg from '../../assets/edit.svg'
import donesvg from '../../assets/done.svg'
import deletesvg from '../../assets/delete.svg'
import { v4 as uuidv4 } from 'uuid';



const ToDo = () => {
  const [entry, setEntry] = useState("");
  const [todos, setTodos] = useState(() => {
    // get the todos from localstorage
    const savedTodos = localStorage.getItem("todos");
    // if there are todos stored
    if (savedTodos) {
      // return the parsed the JSON object back to a javascript object
      return JSON.parse(savedTodos);
      // otherwise
    } else {
      // return an empty array
      return [];
    }
  });
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

 
  // useEffect to run once the component mounts
  useEffect(() => {
    // localstorage only support storing strings as keys and values
    // - therfore we cannot store arrays and objects without converting the object
    // into a string first. JSON.stringify will convert the object into a JSON string
    localStorage.setItem("todos", JSON.stringify(todos));
    // add the todos as a dependancy because we want to update the
    // localstorage anytime the todos state changes
  }, [todos]);

  const handleAdd = () => {
    let parsedEntry = entry.trim();
    if (parsedEntry.length == 0) return;
    setTodos(prev => {
      return [...prev, {
        id: uuidv4(),
        text: parsedEntry,
        isCompleted: false,
      }]
    })
    setEntry("");
  }

  const handleComplete = (id) => {
    const editedTodo = todos.find(todo => todo.id === id);
    if (editedTodo.isCompleted) return;
    setTodos(prev => {
      const copy = [...prev]
      copy.find(todo => todo.id === id).isCompleted = true
      return copy;
    })
    setTimeout(() => {
      setTodos(prev => prev.filter((todo) => todo.id !== id));
    }, 3000);
  }
  const handleEditComplete = (id) => {
    setTodoEditing(null)
    setTodos(prev => {
      const copy = [...prev]
      copy.find(todo => todo.id === id).text = editingText
      return copy;
    })
    setEditingText("")
  }

  const handleDelete=(id)=>{
    setTodos(prev => prev.filter(todo=> todo.id!=id));
  }
  return (
    <div className='container mx-auto w-3/4'>
      <div className='flex justify-around gap-5 items-end	' >
        <div className='grow'>
          <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900">Add a Todo</label>
          <input type='text' value={entry} onChange={(e) => { setEntry(e.target.value) }} id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"></input>
        </div>
        <button type="button" onClick={handleAdd} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"> Add</button>
      </div>
      <div className='py-4'>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Todo
                </th>
                <th scope="col" className="px-6 py-3">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {
                todos.map((todo) => {
                  return (
                    <tr className="bg-white border-b" key={todo.id}>
                      <th scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap ${todo.isCompleted && "line-through	"} `}>
                        {
                          todoEditing === todo.id ? (
                            <input type='text' value={editingText} onChange={(e) => { setEditingText(e.target.value) }} id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"></input>
                          ) : (
                            todo.text
                          )
                        }
                      </th>
                      <td className="px-6 py-4">
                        {
                          todoEditing===todo.id?(
                            <>
                            <img src={donesvg} onClick={()=>handleEditComplete(todo.id)} className='inline w-6 mx-1 cursor-pointer' alt="donelogo" />
                            </>
                          ):
                          (
                            <>
                            <img src={donesvg} onClick={() => handleComplete(todo.id)} className='inline w-6 mx-1 cursor-pointer' alt="donelogo" />
                            <img src={editsvg} onClick={() => {setTodoEditing(todo.id),setEditingText(todo.text)}} className='inline w-6 mx-1 cursor-pointer' alt="editlogo" />
                            <img src={deletesvg} onClick={()=> handleDelete(todo.id)} className='inline w-6 mx-1 cursor-pointer' alt="deletelogo" />
                            </>
                          )
                        }
                       
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default ToDo