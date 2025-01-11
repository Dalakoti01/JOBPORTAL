import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompanyTable from './CompanyTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompany from '@/hooks/useGetAllCompany'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Company = () => {
  useGetAllCompany()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input,setInput] = useState("")
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

          <Button onClick = {() => navigate("/admin/companies/create")}>New Company </Button>

          </div>
          
          <CompanyTable/>
        </div>
    </div>
  )
}

export default Company