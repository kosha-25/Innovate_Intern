import axios from 'axios';
import React, { useEffect, useState } from 'react'


const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [clientTotal, setClientTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admin, setAdmins] = useState([])
  useEffect(() => {
    adminCount();
    clientCount();
    salaryCount();
    AdminRecords();
  },[])

  const AdminRecords = async () => {
    try {
      const result = await axios.get('http://localhost:5000/auth/adminlogin');
      // console.log('Admin data:', result.data); // Log response data outside of axios call
      setAdmins(result?.data)
    } catch (error) {
      console.error('Error fetching admin data:', error.message);
    }
     
  };

  console.log(admin);

  const adminCount = () => {
    axios.get('http://localhost:5000/auth/admincount')
    .then(result => {
      if(result.data.success) {
        setAdminTotal(result.data.count)
      }
    
    })  .catch(error => {
      console.error('Error fetching admin count:', error.message);
    });
  }

  const clientCount = () => {
    axios.get('http://localhost:5000/auth/clientcount')
    .then(result => {
      if(result.data.success) {
        setClientTotal(result.data.count)
      }
    
    }).catch(err => {
      console.log('Error fetching client count:', err.message)
    })
  }

  const salaryCount = () => {
    axios.get('http://localhost:5000/auth/salarytotal')
    .then(result => {
      if(result.data.success) {
        setSalaryTotal(result.data.totalSalary)
      }
    
    }).catch(error => {
      console.error('Error fetching total salary:', error.message);
  })
}


  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {adminTotal}</h5>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Client</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {clientTotal} </h5>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {salaryTotal} </h5>
          </div>
        </div>
       </div>

      <div className='mt-4 px-5 pt-3'>
      <h3>List of Admins</h3>
      <table className='table mt-3'>
          <thead>
            <tr>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {admin?.map((a) => (
              <tr key={a._id}>
                <td>{a.email}</td>
                
          
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Home
