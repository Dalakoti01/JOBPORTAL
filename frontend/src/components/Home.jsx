import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJob from './LatestJob'
import Footer from './shared/Foooter'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs()
  const navigate = useNavigate()
  const {user} = useSelector(store => store.auth)
  useEffect(() => {
    if(user?.role==="recruiter"){
      navigate("/admin/companies")
    }
  },[])
  // useEffect(() => {
  //   useGetAllJobs()
  // },[])
  
  return (
    <div>
       <Navbar/>
       <HeroSection/>
       <CategoryCarousel/>
       <LatestJob/>
       <Footer/>
    </div>
   
  )
}

export default Home