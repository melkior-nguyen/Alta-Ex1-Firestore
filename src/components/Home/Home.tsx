//Home.tsx
import React, { useState, useEffect } from 'react'
import './home.css'
import { useAppSelector, useAppDispatch } from '../../hook'
import { fetchTaskFirestore } from '../../redux/todoSlice'
import { deleteAllTaskFirestore } from '../../redux/todoSlice'
import TodoList from './TodoList'

export default function Home() {
  const dispatch = useAppDispatch()
  const taskslist = useAppSelector(state => state.todos.todoList)

  //fetch data from firestore
  useEffect(()=>{
    dispatch(fetchTaskFirestore())
  },[dispatch])

  //delete all tasks func
  const handleDeleteAll= ()=>{
    dispatch(deleteAllTaskFirestore())
  }

  return (
    <div className='home'>

      <div className="container">
        <h1>MyTaskList</h1>

        <ul className="home_tasks">
          {taskslist.length > 0 ?
            <TodoList todoList={taskslist}/> :
            <li className='no_task'>No tasks found, add a task to display it here!</li>}
        </ul>

        {taskslist.length > 1 && <button className='del_all-btn' onClick={handleDeleteAll}>Delete All</button>}
      </div>

    </div>
  )
}

