import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicationTable from './ApplicationTable'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '@/constants'
import { useParams } from 'react-router-dom'
import { setApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const {applicants} = useSelector(store => store.application)
    
    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,{withCredentials : true})
               
                if(res.data.success){
                    console.log(res.data);
                    dispatch(setApplicants(res.data.job))
                } 
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchApplicants()
    },[])
  return (
    <div >
        <Navbar/>
        <div className='flex flex-col ml-10 mt-15 '> 
        <h1 className='font-bold text-xl'>Applicants ({applicants?.application?.length})</h1>
        <ApplicationTable/>
        </div>
        
    </div>
  )
}

export default Applicants