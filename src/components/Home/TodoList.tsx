//TodoList.tsx
import React, { useEffect, useState } from 'react'
import Update from '../Update/Update'
import { useAppDispatch } from '../../hook'
import { deleteTaskFirestore } from '../../redux/todoSlice'

export default function TodoList({ todoList }: any) {
  const list = todoList
  const [editName, setEditName] = useState<string>('')
  const [editDesc, setEditDesc] = useState<string>('')
  const [editId, setEditId] = useState<string>('')
  const dispatch = useAppDispatch()

  // toggle update layout
  const [activeUpdate, setActiveUpdate] = useState<boolean>(false)
  // handle edit btn 
  const handleEdit = (name: string, desc: string, id: string) => {
    setEditName(name)
    setEditDesc(desc)
    setEditId(id)
    setActiveUpdate(true)
  }
  //delete function 
  const handleDelete = (id: string) => {
    dispatch(deleteTaskFirestore(id))
  }

  return (
    list.map((item: any, index: number) => {
      return (
        <li className='home_task' key={index}>
          <div className='home_task-info'>
            <h3>{item.taskname}</h3>
            <p>{item.taskdesc}</p>
          </div>
          {item.important ? <span>Important!</span> : null}
          <div className="home_task-btns">
            <button className='btn edit_btn' onClick={(() => handleEdit(item.taskname, item.taskdesc, item.id))}>Edit</button>
            <button className='btn delete_btn' onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
          {activeUpdate ? <Update OnClick={() => setActiveUpdate(false)} name={editName} desc={editDesc} id={editId} impo={item.important} /> : null}
        </li>
      )
    })
  )
}

