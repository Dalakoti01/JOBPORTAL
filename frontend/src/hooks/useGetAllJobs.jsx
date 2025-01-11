import { JOB_API_ENDPOINT } from '@/constants';
import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector(state => state.job.searchQuery);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/allJob?keyword=${searchQuery}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllJobs();
    }, [dispatch, searchQuery]);
};

export default useGetAllJobs;
