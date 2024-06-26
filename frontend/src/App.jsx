import {Route, Routes, BrowserRouter} from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Admin from './Components/Admin'
import Clients from './Components/Clients'

import Profile from './Components/Profile'

import Category from './Components/Category'
import AddCategory from './Components/AddCategory'
import AddClient from './Components/AddClient'
import EditClient from './Components/EditClient'
import Home from './Components/Home'
import Start from './Components/Start'
import ClientLogin from './Components/ClientLogin'
import ClientSignUp from './Components/ClientSignUp'
import ClientDashboard from './Components/ClientDashboard'
import Role from './Components/Role'
import SelectRole from './Components/SelectRole'
import ApplyRole from './Components/ApplyRole'
import EditNewClient from './Components/EditNewClient'
import Approval from './Components/Approval'
import ApproveList from './Components/ApproveList'
function App() {
 
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/clientlogin" element={<ClientLogin />}/>
        <Route path="/clientsignup" element={<ClientSignUp />}/>
        
        <Route path='/clientdashboard' element={<ClientDashboard/>}>
        <Route path="role" element={<Role />} />
        <Route path="selectrole" element={<SelectRole />} />
        <Route path="applyrole" element={<ApplyRole/>} />
        
        </Route>

        <Route path="/adminlogin" element={<Admin />}>
            <Route path="" element={<Home />}>
            </Route>
          <Route path="client" element={<Clients />} />
          <Route path="approve" element={<Approval />} />
          <Route path="approved-list" element={<ApproveList />} />
          <Route path="category" element={<Category />} />
          <Route path="addcategory" element={<AddCategory />} />
          <Route path="addclient" element={<AddClient />} />

          <Route path='editnewclient/:id' element={<EditNewClient/>}/>
          <Route path="profile" element={<Profile />} />
          <Route path="editclient/:id" element={<EditClient />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
