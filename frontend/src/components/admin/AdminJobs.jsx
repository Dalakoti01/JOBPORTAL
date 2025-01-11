import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompanyTable from './CompanyTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompany from '@/hooks/useGetAllCompany'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import useGetAdminJobs from '@/hooks/useGetAdminJobs'
import AdminTable from './AdminTable'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAdminJobs()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input,setInput] = useState("")
  useEffect((e) => {
    dispatch(setSearchJobByText(input))
  },[input])
  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  },[input])
  return (
    <div>
        <Navbar/>
        <div className=' mx-auto my-5 max-w-7xl '>
          <div className='flex justify-between mb-10'>
          <Input
           placeholder = "Filter By name"
           type = "text"
           className = "w-40"
           onChange = {(e) => setInput(e.target.value)}
          />

          <Button onClick = {() => navigate("/admin/jobs/create")}>Create New Job</Button>

          </div>
          
          <AdminTable/>
        </div>
    </div>
  )
}

export default AdminJobs