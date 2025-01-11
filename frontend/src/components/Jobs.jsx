import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import JobCard from "./JobCard";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { data } from "autoprefixer";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Jobs = () => {
  useGetAllJobs();
  // const jobs = [1, 2, 3, 4, 5, 6, 7, 8];
  const filterData = [
    {
      filterType: "Location",
      array: ["Delhi", "Agra", "NCR", "MATHURA", "Kolkata"],
    },
    {
      filterType: "Industry",
      array: ["Web Developer", "Video Editor", "Music Producer"],
    },
    {
      filterType: "Salary",
      array: ["0-40k", "40k-1 lac", "1 lac - 5 lac"],
    },
  ];
  const { allJobs, searchQuery } = useSelector((store) => store.job);
  const [selectedValue, setSelectedValue] = useState("");
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue]);

  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job?.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job?.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchQuery]);

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, []);
  useEffect(() => {
    return () => {
      setSelectedValue("");
      setFilterJobs(allJobs); // Reset to show all jobs
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex mt-10 w-100% ">
        <div className="w-1/5 ml-10">
          <h3>Filter Jobs</h3>
          <hr className="mt-3" />
          <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {filterData.map((data, index) => (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="font-bold mb-3">{data.filterType}</h1>
                {data.array.map((item, index) => (
                  <div className="mb-1">
                    <RadioGroupItem key={item} value={item} />
                    <Label>{item}</Label>
                  </div>
                ))}
              </motion.div>
            ))}
          </RadioGroup>
        </div>
        <div className="ml-10 mr-10 grid grid-cols-3 gap-5 w-4/5">
          {filterJobs <= 0 ? (
            <span> No Jobs </span>
          ) : (
            filterJobs.map((job, index) => <JobCard key={job?._id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
