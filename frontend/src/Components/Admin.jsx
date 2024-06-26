import React from 'react'
import { Link } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css"
import { Outlet } from 'react-router-dom'
import Approval from '../Components/Approval.jsx'

const Admin = () => {
  return (
    <div className='container-fluid'>
      <div className='row flex-nowrap'>
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
          <Link to="/adminlogin"
                className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'>
                  <span className='fs-5 fw-bolder d-none d-sm-inline'>
                  Admin Dashboard
                  </span>
                  
                  </Link>
          <ul
          className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'
          id="menu">
            <li className='w-100'>
              <Link to="/adminlogin"
              className='nav-link text-white px-0 align-middle'>
                <i className='fs-4 bi-speedometer2 ms-2'></i>
                <span className='ms-2 d-done d-sm-inline'>Dashboard</span>
                </Link>
            </li>

            <li className='w-100'>
              <Link to="/adminlogin/client"
              className='nav-link text-white px-0 align-middle'>
               <i className='fs-4 bi-people ms-2'></i>
               <span className='ms-2 d-done d-sm-inline'>Manage Clients</span></Link>
            </li>

            <li className='w-100'>
              <Link to="/adminlogin/approve"
              className='nav-link text-white px-0 align-middle'>
               <i className='fs-4 bi-people ms-2'></i>
               <span className='ms-2 d-done d-sm-inline'>Manage Approvals</span></Link>
            </li>

            {/* <li className='w-100'>
              <Link to="/adminlogin/approved-list"
              className='nav-link text-white px-0 align-middle'>
               <i className='fs-4 bi-people ms-2'></i>
               <span className='ms-2 d-done d-sm-inline'>Approve List</span></Link>
            </li> */}

            <li className='w-100'>
              <Link to="/adminlogin/category"
              className='nav-link text-white px-0 align-middle'>
               <i className='fs-4 bi-people ms-2'></i>
               <span className='ms-2 d-done d-sm-inline'>Manage Category</span></Link>
            </li>
            
            <li className='w-100'>
              <Link to="/adminlogin/profile"
              className='nav-link text-white px-0 align-middle'>
               <i className='fs-4 bi-person ms-2'></i>
               <span className='ms-2 d-done d-sm-inline'>Profile</span></Link>
            </li>
           
           
            <li className='w-100'>
              <Link to="/"
              className='nav-link text-white px-0 align-middle'>
               <i className='fs-4 bi-power ms-2'></i>
               <span className='ms-2 d-done d-sm-inline'>Logout</span></Link>
            </li>
          </ul>
          </div>
        </div>
          <div className='col p-0 m-0'>
            <div className='p-2 d-flex justify-content-center shadow'>
              <h4>Client Management System</h4>
            </div>
            <Outlet/>
          </div>
      </div>
    </div>
  )
}

export default Admin
