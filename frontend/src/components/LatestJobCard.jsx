import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Ghost } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const LatestJobCard = ({job}) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`description/${job?._id}`)} className='flex flex-col cursor-pointer mx-10 p-4 border rounded-lg'>
        <div>
            <h1 className='font-bold'>{job?.company?.name}</h1>
            <h3 className='text-sm'>India</h3>
        </div>
        <div>
            <h1 className='font-bold'>{job?.title}</h1>
            <p className='text-sm text-slate-600'>{job?.description}</p>
        </div>
        <div>
            <Badge className={'text-blue-700 font-bold '} variant={Ghost} >{job?.position} Position</Badge>
            <Badge className={'text-red-600 font-bold '} variant={Ghost} > {job?.jobType}</Badge>
            <Badge className={'text-purple-600 font-bold '} variant={Ghost} >{job?.salary}  LPA </Badge>

        </div>
    </div>
  )
}

export default LatestJobCard