import React from 'react';
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';

const LatestJob = () => {
    // const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
    const {allJobs} = useSelector(store => store.job)
    return (
        <div className='flex flex-col justify-center'>
            <h1 className='ml-8 font-bold text-3xl'><span className='text-purple-900'>Latest & Top</span> Job Openings</h1>
            <div className='m-auto grid grid-cols-3  gap-4 my-4'>
                {
                   allJobs.length === 0 ? <span>No Jobs Found </span> :allJobs.slice(0, 6).map((job) => <LatestJobCard className="shadow-xl" key={job._id} job ={job} />)
                }
            </div>
        </div>
    );
};

export default LatestJob;
