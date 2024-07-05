import React from 'react'
import Navigation from '../Navigation/Navigation'
import Dashbody from './Dashbody'
const Dashboard = () => {
  return (
    <>
        <div className='dashboard-container'>
          <Navigation />
          <Dashbody />
        </div>
    </>
    
  )
}

export default Dashboard