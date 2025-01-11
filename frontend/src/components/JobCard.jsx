import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const JobCard = ({job}) => {
    const navigate = useNavigate()
    // const jobId = "nsjacbeskajscl";
    const daysAgoFunc = (mongodbTime) => {
        const dateCreated = new Date(mongodbTime)
        const currentTime =  new Date()
        const timeDifference = currentTime - dateCreated;
        return  Math.floor(timeDifference/(24*60*60*1000));
    }


  return (
    <div className='flex flex-col w-full justify-between p-4 border rounded-lg shadow-lg'>
        <div className='flex justify-between'>
        <h3 className='text-sm whitespace-nowrap text-slate-400'>{daysAgoFunc(job?.createdAt) === 0 ? "Today" :`${daysAgoFunc(job?.createdAt)}` } days ago</h3>
        <Button  variant = "outline"><Bookmark/></Button>
        </div>
        <div className='flex gap-5'>
            <Button className = "w-9 border border-gray-300" variant = "outline">
            <Avatar>
                <AvatarImage src = "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"/>
            </Avatar>
            </Button>
            <div>
            <h1>{job?.company?.name}</h1>
            <h3 className='text-slate-400 text-sm'>India</h3>
            </div>
        </div>

        <h2 className='font-bold'>{job?.title}</h2>
        <p className='text-xs'>{job?.description}</p>

        <div className='flex gap-4 mt-4'>
            <Badge className = "cursor-pointer text-blue-700" variant="outline">{job?.position} POSITION</Badge>
            <Badge className = "cursor-pointer text-red-700" variant="outline">{job?.jobType}</Badge>
            <Badge className = "cursor-pointer text-purple-800" variant="outline">{job?.salary}LPA</Badge>
        </div>

        <div className='flex gap-5 mt-4'>
            <Button onClick = {()=> navigate(`/description/${job?._id}`)} variant = "outline">Details</Button>
            <Button className = "bg-purple-900">Save For Later</Button>
        </div>
    </div>

  )
}

export default JobCard