import React from 'react'
import './BillHistory.css'
import Nav from '@/components/Dashboard/Nav/Nav'
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar'
import BillHistoryTable from '@/components/Dashboard/BillHistoryTable/BillHistoryTable'

const BillHistory = () => {
  return (
    <>
    <Sidebar />
    <Nav />
    <div className='billhistory'>
        <BillHistoryTable />
    </div>
    
    </>
    
  )
}

export default BillHistory
