import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '@/constants'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [companyName,setCompanyName] = useState()
    const createCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`,{companyName},{
                headers : {
                    "Content-Type" : "application/json"
                },
                withCredentials : true
            })
            console.log(res);

            if(res.data.success){
                dispatch(setSingleCompany(res.data.company))
                toast(res.data.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10 flex flex-col gap-5'>
        <div>
        <h1 className='font-bold text-xl mb-2'>Your Company Name</h1>
        <p>What name would you like to give to your company ? However you can Change it further  </p>
        </div>

        <Label>Company Name </Label>
        <Input
         placeholder = "Microsoft,Google etc ..."
         type = "text"
         onChange = {(e) => setCompanyName(e.target.value)}

        />
        <div className='flex gap-3'>
            <Button onClick = {() => navigate("/admin/companies") } variant = "outline">Cancel</Button>
            <Button onClick = {createCompany}>Continue</Button>
        </div>
        </div>
        
    </div>
  )
}

export default CompanyCreate