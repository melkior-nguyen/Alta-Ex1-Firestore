//Navbar.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

export default function Navbar() {
    return (
        <nav className='nav'>
            <ul className='nav_list'>
                <Link to='/' className='nav_logo'>
                   <span>HIẾU'S TODOS</span> 
                </Link>
                <Link to='/add' className='nav_add-btn'>
                    <button>Add New Task</button>
                </Link>
            </ul>
        </nav>
    )
}
