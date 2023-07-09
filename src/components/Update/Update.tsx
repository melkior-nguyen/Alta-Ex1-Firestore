//Update.tsx
import React, { useEffect, useRef, useState } from 'react'
import './update.css'
import { useAppDispatch } from '../../hook'
import {updateTaskFirestore } from '../../redux/todoSlice'

export default function Update({ OnClick, name, desc, id, impo }: any) {
  const updateNameRef = useRef<HTMLInputElement>(null)
  const updateDescRef = useRef<HTMLTextAreaElement>(null)
  const [important, setImportant]= useState<boolean>(impo)
  const dispatch = useAppDispatch()
  //hiển thị task hiện tại 
  useEffect(() => {
    if (updateNameRef.current && updateDescRef.current) {
      updateNameRef.current.value = name
      updateDescRef.current.value = desc
    }
  }, [])
  // dispatch update task func
  const handleUpdateSubmit = (e: any) => {
    e.preventDefault()
    if (updateNameRef.current && updateDescRef.current) {
      let updatedTask = {
        id,
        taskname: updateNameRef.current.value,
        taskdesc: updateDescRef.current.value,
        important
      }
      dispatch(updateTaskFirestore({id: id, task: updatedTask}))
      alert('updated task successfully')
      OnClick()
    }
  }
  return (
    <div className='update'>
      <form onSubmit={(e) => handleUpdateSubmit(e)} className='update_form'>

        <label htmlFor="">Task Name:</label>
        <input type="text" className='update_name' ref={updateNameRef} />

        <label htmlFor="">Task Description:</label>
        <textarea rows={8} className='update_desc' ref={updateDescRef} />

        <button type='button' className={important ? 'btn impo_btn actived' : 'btn impo_btn'} onClick={() => setImportant(!important)}>Important</button>
        <button type='submit' className='update_btn'>Update</button>

      </form>
    </div>
  )
}
