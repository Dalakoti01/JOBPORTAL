import { COMPANY_API_ENDPOINT } from '@/constants';
import { setSingleCompany } from '@/redux/companySlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, { withCredentials: true });
                console.log(res.data.company);
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleCompany();
    }, [companyId, dispatch]);
};
