import { useState } from 'react'
import './App.css'

function App() {
  const [pendingTasks, setPendingTasks] = useState(["Testing", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "Testing again"]);
  const [completedTasks, setCompletedTasks] = useState(["testingaaa"]);

  const handleCheckboxChange = (event) => {
    setCompletedTasks(prev => [...prev, pendingTasks[event.target.id]])
    setPendingTasks(pendingTasks.filter((_, index) => event.target.id != index));
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
        <h1 className='text-2xl text-center pb-3 border-b border-cusSec font-display font-black'>To-Do List</h1>
        <ul className='list-none mt-2 px-2'>
          {pendingTasks.map((elem, index) => {
            console.log(elem);
            return (
              <li key={index} className='flex items-center my-2 justify-between rounded-xs'>
                <div className='flex items-center m-2'>
                  <input type='checkbox'
                    id={index}
                    onChange={handleCheckboxChange}
                    className='appearance-none shrink-0 mr-2 border border-cusSec rounded-xs w-3 h-3 checked:bg-cusSec'
                  />
                  <label htmlFor={index}>{elem}</label>
                </div>
                <span className='p-2 border-x border-cusSec hover:cursor-pointer hover:bg-cusSec hover:text-cusPrim'
                  onClick={() => deletePendingTask(index)}
                >Delete</span>
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
                  <li key={index} className='flex items-center my-2 justify-between rounded-xs'>
                    <div className='flex items-center m-2'>
                      <input type='checkbox'
                        id={index}
                        checked={true}
                        onChange={handleCheckboxChange}
                        className='appearance-none shrink-0 mr-2 border border-cusSec rounded-xs w-3 h-3 checked:bg-cusSec'
                      />
                      <label htmlFor={index} className='line-through'>{elem}</label>
                    </div>
                    <span className='p-2 border-x border-cusSec hover:cursor-pointer hover:bg-cusSec hover:text-cusPrim'
                      onClick={() => deleteCompletedTask(index)}
                    >Delete</span>
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
