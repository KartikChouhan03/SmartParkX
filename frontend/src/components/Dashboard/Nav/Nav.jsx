import React from 'react'
import './Nav.css'
import { Bell } from 'lucide-react'

const Nav = () => {
  return (
    <div className='nav'>
      <div className='nav-left'>
        <h2>Welcome Back!</h2>
        <p>Dashboard</p>
      </div>

      <div className='nav-right'>
        <button className='notification'>
          <Bell size={20} />
        </button>

      </div>

    </div>
  )
}

export default Nav
