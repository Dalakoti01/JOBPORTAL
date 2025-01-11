
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import Details from './components/Details'
import Company from './components/admin/Company'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJobs from './components/admin/PostJobs'
import Applicants from './components/admin/Applicants'

function App() {
  
  const router = createBrowserRouter([
    {
      path : "/",
      element : <Home/>
    },
    {
      path : "/login",
      element : <Login/>
    },
    {
      path : "/signUp",
      element : <Signup/>
    },
    {
      path : "/jobs",
      element : <Jobs/>
    },
    {
      path : "/description/:id",
      element : <Details/>
    },
    {
      path : "/browse",
      element : <Browse/>
    },
    {
      path : "/profile",
      element : <Profile/>
    },

    // Admin routes stared from here 

    {
      path : "/admin/companies",
      element : <Company/>
    },
    {
      path : "/admin/companies/create",
      element : <CompanyCreate/>
    },
    {
      path : "/admin/companies/:id",
      element : <CompanySetup/>
    },
    {
      path : "/admin/jobs",
      element : <AdminJobs/>
    },
    {
      path : "/admin/jobs/create",
      element : <PostJobs/>
    },
    {
      path : "/admin/jobs/:id/applicants",
      element : <Applicants/>
    }
    
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
