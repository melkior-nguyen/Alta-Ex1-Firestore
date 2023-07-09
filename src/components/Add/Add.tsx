//Add.tsx
import React, { useState, useRef } from 'react'
import './add.css'
import { useAppDispatch } from '../../hook'
import { addTaskFirestore } from '../../redux/todoSlice'

export default function Add() {
  const [nameInput, setNameInput] = useState<string>('')
  const [descInput, setDescInput] = useState<string>('')
  const [important, setImportant] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  // dispatch add task func
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const newTask = {
      taskname: nameInput,
      taskdesc: descInput,
      important: important
    }
    dispatch(addTaskFirestore(newTask))
    
    //clearing form 
    setNameInput('')
    setDescInput('')
    setImportant(false)
    alert('Add new task successfully!')
  }
  return (
    <div className='add'>
      <form className='add_form' onSubmit={(e) => handleSubmit(e)}>

        <div className="form_input">
          <label htmlFor="name_input">Task Name :</label>
          <input type="text" id='name_input' required onChange={(e) => setNameInput(e.target.value)} value={nameInput} />
          <label htmlFor="desc_input">Task Description :</label>
          <textarea id='desc_input' rows={8} required onChange={(e) => setDescInput(e.target.value)} value={descInput} />
        </div>

        <div className="form_btn">
          <button type='button' className={important ? 'btn impo_btn actived' : 'btn impo_btn'} onClick={() => setImportant(!important)}>Important</button>
          <button type='submit' className='btn add_btn'>Add Task</button>
        </div>

      </form>
    </div>
  )
}
