import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useSelector } from 'react-redux'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '@/constants'
import { toast } from 'sonner'

const applicationStaus = ["accepted","rejected"]
const ApplicationTable = () => {
    const {applicants} = useSelector(store => store.application)
    const handleStatus = async(status,id) => {
      try {
        console.log("running");
        
        const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`,{status},{withCredentials:true})
        console.log(res.data);
        console.log(res.data.success);
        
        if(res.data.success){
          toast(res.data.message)

        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  return (
    <div>
        <div className='flex items-center justify-center mt-10 max-w-7xl'>
            
            <Table className= "mx-auto">
      <TableCaption>A list of your recent applied users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Resume</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants && applicants?.application?.map((item) => (
          <TableRow key={item._id}>
            <TableCell className="font-medium">{item?.applicant?.fullName}</TableCell>
            <TableCell>{item?.applicant?.email}</TableCell>
            <TableCell>{item?.applicant?.phoneNumber}</TableCell>
            <TableCell>
                {
                    item?.applicant?.profile?.resume? <a className="text-blue-600 cursor-pointer" target="_blank" href={item?.applicant?.profile?.resume} >{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                }
                </TableCell>   
            <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
            <TableCell className="text-right">
                {
                    <Popover>
                        <PopoverTrigger>
                           
                            <MoreHorizontal/>
                            </PopoverTrigger>
                        <PopoverContent className="w-30 cursor-pointer">
                            {
                                applicationStaus.map((status,index) => (
                                    <div onClick={() => handleStatus(status,item?._id)} key={index}>
                                        {status}
                                        
                                    </div>
                                ))
                            }
                        </PopoverContent>
                    </Popover>
                }
                </TableCell>
          </TableRow>
        ))}
      </TableBody>

     
    </Table>
        </div>
    </div>
  )
}

export default ApplicationTable