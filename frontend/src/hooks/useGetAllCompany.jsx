import { COMPANY_API_ENDPOINT } from '@/constants';
import { setCompanies } from '@/redux/companySlice';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllCompany = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies); // Safe usage in the hook body

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, { withCredentials: true });
        console.log("Response Success:", res.data.success);
        console.log("Response Data:", res.data);

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
          console.log("Companies have been updated in Redux.");
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, [dispatch]);

  console.log("Updated Companies in Redux:", companies); // Safe to use here
};

export default useGetAllCompany;
