import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {appliedjobs} = useSelector(store => store.job);

  return (
    <div>
        <Table>
            <TableCaption>A list of your applied jobs </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role </TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className = "text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    appliedjobs?.length <=0 ? <span>No job YET</span> : appliedjobs.map((appliedJob) => (
                        <TableRow key={appliedJob._id}>
                            <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                            <TableCell>{appliedJob?.job?.title}</TableCell>
                            <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                            <TableCell className="text-right"><Badge>{appliedJob?.status}</Badge></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable