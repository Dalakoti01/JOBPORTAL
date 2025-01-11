import { APPLICATION_API_ENDPOINT } from '@/constants'
import { setAppliedJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllApplication = () => {
    const dispatch = useDispatch()
  useEffect(() => {
    const fetchAllApplication = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`,{withCredentials : true})
            if(res.data.success){
                console.log(res.data.success);
                console.log(res.data);
                console.log(res.data.application);
                
                dispatch(setAppliedJobs(res.data.application))
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAllApplication()
  } ,[])
}

export default useGetAllApplication