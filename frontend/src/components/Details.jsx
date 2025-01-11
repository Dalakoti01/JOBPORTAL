import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '@/constants';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';

const Details = () => {
  // const isApplied = true;
  const params = useParams()
  const jobId = params.id
  const {job} = useSelector(store => store.job)
  const {user} = useSelector(store => store.auth)
  const {singleJob} = useSelector(store => store.job)
  const dispatch = useDispatch()
  const isInitiallyApplied = singleJob?.application?.some((application) => application.applicant === user?._id) || false
  const [isApplied,setIsApplied] = useState(isInitiallyApplied)
  // In javascript some is used when we want that if anyu one condition satisfy the situation then we should get true as  a result 
  
  const applyHandler = async() => {
    try {
      const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`,{withCredentials:true})
      if(res.data.success){
        setIsApplied(true)
        const updateSingleJob = {...singleJob,application:[...singleJob.application,{applicant : user?._id}]}
        dispatch(setSingleJob(updateSingleJob))
        toast(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message)
    }
  }

  
  useEffect(() => {
    const getSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {withCredentials:true})
        console.log(res);
        
        if(res.data.success){
          dispatch(setSingleJob(res.data.job))
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    getSingleJob()
  },[jobId,dispatch,job?._id])
 
  return (
    <div className='max-w-7xl mx-auto p-5'>
      <div className='flex justify-between'>
        <div>
          <h2 className='font-bold text-xl'>{singleJob?.title}</h2>
          <div className='mt-3 flex gap-3'>
          <Badge className="text-blue-700 cursor-pointer" variant="outline">{singleJob?.position} Position</Badge>
          <Badge className="text-red-700 cursor-pointer" variant="outline">{singleJob?.salary} LPA</Badge>
          <Badge className="text-purple-700 cursor-pointer" variant="outline">{singleJob?.jobType}</Badge>
          </div>
        </div>
        <div>
          <Button onClick={isApplied ? null : applyHandler} disabled = {isApplied} className = {` cursor-pointer rounded-lg ${isApplied ? 'bg-gray-600' : 'bg-blue-600'}`}>{isApplied? "Applied" : "Apply"}</Button>
        </div>
      </div>
      <div className='mt-7'>
        <h2 className='font-bold border-b-2 pb-2 border-gray-600'>Job Description</h2>
        <div className='mt-2 font-bold'>Role : <span className='ml-3 font-normal'>{singleJob?.title}</span></div>
        <div className='mt-2 font-bold'>Location : <span className='ml-3 font-normal'> {singleJob?.location}</span></div>
        <div className='mt-2 font-bold'>Description : <span className='ml-3 font-normal'> {singleJob?.description}</span></div>
        <div className='mt-2 font-bold'>Experience : <span className='ml-3 font-normal'>{singleJob?.experienceLevel} YRS </span></div>
        <div className='mt-2 font-bold'>Salary : <span className='ml-3 font-normal'>{singleJob?.salary} LPA </span></div>
        <div className='mt-2 font-bold'>Total Applicants : <span className='ml-3 font-normal'> {singleJob?.application?.length}</span></div>
        <div className='mt-2 font-bold'>Posted Date : <span className='ml-3 font-normal'>{singleJob?.createdAt.split("T")[0]} </span></div>
        



      </div>
    </div>
  )
}

export default Details