import { setSearchQuery } from '@/redux/jobSlice'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [query,setQuery] = useState("")
  
  const submitHandler = () => {
    dispatch(setSearchQuery(query))
    navigate("/browse")
  }
  return (
    <div className='flex flex-col gap-4 items-center justify-center'>
        <h3 className='text-red-600 font-bold mt-7 m-auto text-20 p-3 cursor-pointer border-gray-100 rounded-xl shadow-md bg-slate-100'>No.1 Job Hunt Website</h3>
        <h1 className='text-4xl font-bold'>Search, Apply & <br /> Get Your <span className='text-purple-900'>Dream Jobs</span> </h1>
        <p>Want a good paying job ?? No need to worry we are here to connect you with the industry</p>
        <div className='w-full flex justify-center '>
          <div className='flex w-1/3'>
          <input
           type="text"
            className='flex-grow border mx-auto rounded-lg p-2 border-gray-200 shadow-lg' 
            placeholder='Find Your dream Job' 
            onChange={(e) => setQuery(e.target.value)}
            />
          <button onClick={submitHandler} className='bg-gray-800 text-white p-2 rounded-md ml-2  '>
            <Search/>
          </button>
          </div>
          
        </div>
    </div>
  )
}

export default HeroSection