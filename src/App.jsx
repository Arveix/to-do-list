import { useState } from 'react'
import './App.css'

function App() {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const handleTaskInputChange = (event) => {
    setTaskInput(event.target.value);
    console.log(taskInput);
  }

  const addNewTask = () => {
    if(taskInput.trim() != '') {
      setPendingTasks(prev => [...prev, taskInput]);
      setTaskInput('');
    }
  }

  const handlePendingCheckBoxChange = (event) => {
    setCompletedTasks(prev => [...prev, pendingTasks[event.target.name]]);
    setPendingTasks(pendingTasks.filter((_, index) => event.target.name != index));
  };

  const handleCompletedCheckBoxChange = (event) => {
    setPendingTasks(prev => [...prev, completedTasks[event.target.name]]);
    setCompletedTasks(completedTasks.filter((_, index) => event.target.name != index));
  };

  const deletePendingTask = (indexToBeDeleted) => {
    setPendingTasks(pendingTasks.filter((_, index) => indexToBeDeleted != index));
  }

  const deleteCompletedTask = (indexToBeDeleted) => {
    setCompletedTasks(completedTasks.filter((_, index) => indexToBeDeleted != index));
  }

  return (
    <>
      <div className='max-w-xl m-auto flex flex-col p-5 rounded-sm bg-cusPrim text-cusSec'>
        <h1 className='text-2xl text-center pb-3 font-display font-black'>To-Do List</h1>
        <hr className='border border-cusSec'/>
        
        <div className='my-5 flex w-full'>
          <input 
          type='text'
          className='p-2 border border-cusSec rounded-l-sm focus:outline-none grow-2'
          placeholder='Add a new task'
          value={taskInput}
          onChange={handleTaskInputChange}
        />
        <button className='p-2 px-4 rounded-r-sm bg-cusSec text-cusPrim' onClick={addNewTask}> Add </button>
        </div>

        <hr className='border border-cusSec'/>

        {/* PENDING TASKS */}
        <ul className='list-none mt-2 px-2'>
          {pendingTasks.map((elem, index) => {
            console.log(elem);
            return (
              <li key={`pending${index}`} className='flex items-center my-2 justify-between rounded-xs'>
                <div className='flex items-center m-2'>
                  <input type='checkbox'
                    id={`pending${index}`}
                    name={index}
                    checked={false}
                    onChange={handlePendingCheckBoxChange}
                    className='appearance-none shrink-0 mr-2 border border-cusSec rounded-xs w-3 h-3 checked:bg-cusSec hover:bg-cusSec'
                  />
                  <label htmlFor={`pending${index}`}>{elem}</label>
                </div>
                <button className='p-2 border-x border-cusSec hover:cursor-pointer hover:bg-cusSec hover:text-cusPrim'
                  onClick={() => deletePendingTask(index)}
                >Delete</button>
              </li>
            )
          })}
        </ul>

        {/* COMPLETED TASKS */}
        {(completedTasks.length > 0) &&
          <>
            <h1 className='mt-6 font-bold'>COMPLETED TASKS</h1>
            <ul className='list-none px-2'>
              {completedTasks.map((elem, index) => {
                console.log(elem);
                return (
                  <li key={`completed${index}`} className='flex items-center my-2 justify-between rounded-xs'>
                    <div className='flex items-center m-2'>
                      <input type='checkbox'
                        id={`completed${index}`}
                        name={index}
                        checked={true}
                        onChange={handleCompletedCheckBoxChange}
                        className='appearance-none shrink-0 mr-2 border border-cusSec rounded-xs w-3 h-3 checked:bg-cusSec hover:bg-cusPrim'
                      />
                      <label htmlFor={`completed${index}`} className='line-through'>{elem}</label>
                    </div>
                    <button className='p-2 border-x border-cusSec hover:cursor-pointer hover:bg-cusSec hover:text-cusPrim'
                      onClick={() => deleteCompletedTask(index)}
                    >Delete</button>
                  </li>
                )
              })}
            </ul>
          </>
        }
      </div>
    </>
  )
}

export default App
