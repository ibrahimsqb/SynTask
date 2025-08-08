import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = JSON.parse(localStorage.getItem('todos'));
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem('todos'));
      setTodos(todos);
    }
  }, []);

  const savetoLS = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((item) => {
      return item.id === id;
    });
    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);

    savetoLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);

    savetoLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo('');
    console.log(todos);

    savetoLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      //uss todo ka index jiski id match
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    // todos[index].isCompleted = !todos[index].isCompleted;
    // setTodos(todos);
    // console.log(todos);
    savetoLS();
  };

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      {/* <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[55%]"> */}
      <div className="mx-3 my-5 min-h-[80vh] rounded-xl border border-purple-500 bg-[#0d0d0d] p-5 text-purple-900 shadow-[0_0_20px_#a855f7] md:container md:mx-auto md:w-[55%]">
        <h1 className="text-center text-2xl font-bold">SynTask - Take over the world, one task at a time</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Add a Task</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-full px-5 py-1"
              // onKeyDown={(e) => {
              //   if (e.key === 'Enter') {
              //     handleAdd();
              //   }
              // }}
            />
            <button onClick={handleAdd} disabled={todo.length < 3} className="mx-2 rounded-full bg-violet-600 p-3 py-1 font-bold text-white hover:bg-violet-800 disabled:bg-gray-500">
              Save
            </button>
          </div>
        </div>
        <input className="my-4" onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className="mx-2" htmlFor="show">
          Show Finished
        </label>
        <div className="mx-auto my-2 h-[1px] w-[90%] bg-purple-900 opacity-20"></div>
        <h2 className="text-xl font-bold">Your Tasks</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-3">No tasks to display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo my-3 flex justify-between">
                  <div className="flex gap-5">
                    <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                    <div className={item.isCompleted ? 'line-through' : ''}>{item.todo}</div>
                  </div>

                  <div className="buttons flex h-full">
                    <button onClick={(e) => handleEdit(e, item.id)} className="mx-1 rounded-md bg-violet-600 p-3 py-1 font-bold text-white hover:bg-violet-800">
                      <FaEdit />
                    </button>
                    <button onClick={(e) => handleDelete(e, item.id)} className="mx-1 rounded-md bg-violet-600 p-3 py-1 font-bold text-white hover:bg-violet-800">
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}
export default App;
