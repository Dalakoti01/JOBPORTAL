import { JOB_API_ENDPOINT } from '@/constants'
import { setAdminJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAdminJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                const res =  await axios.get(`${JOB_API_ENDPOINT}/adminJob`,{withCredentials : true})
                console.log(res.data.success);
                console.log(res.data);
                dispatch(setAdminJobs(res.data.jobs))
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAdminJobs()
    },[dispatch])
}

export default useGetAdminJobs