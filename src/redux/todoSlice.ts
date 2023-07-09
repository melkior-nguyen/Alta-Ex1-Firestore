import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from "../firebase/config"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"


//get CollectionRef
const todosCollectionRef = collection(db, 'todos')
// add task func
export const addTaskFirestore = createAsyncThunk(
    'tasks/addTaskToFirestore',
    async (task: any) => {
        const addTaskRef = await addDoc(todosCollectionRef, task)
        const newtask = { id: addTaskRef.id, task }
        return newtask
    }
)

// render task func
export const fetchTaskFirestore = createAsyncThunk(
    'task/fetchTaskFirestore',
    async () => {
        const querySnapshot = await getDocs(todosCollectionRef)
        const tasks = querySnapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
        return tasks
    }
)

// delete task func
export const deleteTaskFirestore = createAsyncThunk(
    'tasks/deleteTaskFirestore',
    async (id: string) => {
        const currDoc = doc(db, 'todos', id)
        await deleteDoc(currDoc)
        return id
    }
)

//delete all task func
export const deleteAllTaskFirestore = createAsyncThunk(
    'task/deleteAllTaskFirestore',
    async () => {
        const querySnapshot = await getDocs(todosCollectionRef)
        for (let task of querySnapshot.docs) {
            const currDoc = doc(db, 'todos', task.id)
            await deleteDoc(currDoc)
        }
        return []
    }
)

//update task func
export const updateTaskFirestore = createAsyncThunk(
    'task/updateTaskFirestore',
    async (updatedTask: { id: string, task: any }) => {
        const querySnapshot = await getDocs(todosCollectionRef)
        for (let task of querySnapshot.docs) {
            console.log(task.id === updatedTask.id) // undefined
            console.log(updatedTask.task)
            if (task.id === updatedTask.id) {
                const currDoc = doc(db, 'todos', task.id)
                await updateDoc(currDoc, updatedTask.task)
            }
        }
        console.log(updatedTask.task)
        return updatedTask.task
    }
)

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todoList: [] as { id: string, task: any }[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTaskFirestore.fulfilled, (state, action) => {
                state.todoList.push(action.payload)
            })
            .addCase(fetchTaskFirestore.fulfilled, (state, action) => {
                state.todoList = action.payload
            })
            .addCase(deleteTaskFirestore.fulfilled, (state, action) => {
                state.todoList = state.todoList.filter((task) => {
                    return task.id !== action.payload
                })
            })
            .addCase(deleteAllTaskFirestore.fulfilled, (state, action) => {
                state.todoList = action.payload
            })
            .addCase(updateTaskFirestore.fulfilled, (state, action) => {
                console.log(action.payload)
                const { id, task } = action.payload
                const taskIndex = state.todoList.findIndex((task) => task.id === id)
                console.log(taskIndex)
                if (taskIndex !== -1) {
                    state.todoList[taskIndex] = action.payload
                }
            })
            .addCase(addTaskFirestore.rejected, (state, action) => {
                alert('Error: add task failed')
            })
            .addCase(fetchTaskFirestore.rejected, (state, action) => {
                alert('Error: fetch data failed')
            })
            .addCase(deleteTaskFirestore.rejected, (state, action) => {
                alert('Error: delete task failed')
            })
            .addCase(deleteAllTaskFirestore.rejected, (state, action) => {
                alert('Error: delete all task failed')
            })
            .addCase(updateTaskFirestore.rejected, (state, action) => {
                alert('Error: update failed')
            })
    }
})
const { actions, reducer } = todoSlice
export default reducer

