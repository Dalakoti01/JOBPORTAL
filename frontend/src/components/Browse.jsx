import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import JobCard from './JobCard'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'

// const jobs = [1,2,3,4,5,6]

const Browse = () => {
    useGetAllJobs()
    const {allJobs} = useSelector(store => store.job)
    const dispatch = useDispatch()
    useEffect(() => {
        return()=> {
            dispatch(setSearchQuery(""))
        }
        
    },[])

  return (
    <div>
        <Navbar/>
        <h1 className='ml-10 mt-10 font-bold text-xl'>Search Result ({allJobs.length})</h1>
        <div className='flex p-10 gap-4 m-auto'>
            <div className='grid grid-cols-3 gap-5'>
            {
                allJobs.map((job) => (
                    <div className='shadow-xl'>
                        <JobCard key={job?._id} job={job}/>
                    </div>
                ))
            }
            </div>
        </div>

    </div>
  )
}

export default Browse