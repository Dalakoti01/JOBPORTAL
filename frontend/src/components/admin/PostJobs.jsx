import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PostJobs = () => {
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirement: "",
    salary: 0,
    companyId: "",
    location: "",
    experienceLevel: 0,
    position: 0,
    jobType: "",
  });

  const [loading, setLoading] = useState(false);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeSelectHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    const formattedInput = {
        ...input,
        salary: parseInt(input.salary, 10),
        experienceLevel: parseInt(input.experienceLevel, 10),
        position: parseInt(input.position, 10),
      };
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/postJob`, formattedInput, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res.data.success);
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs")
      }
    } catch (error) {
        console.log(error.response?.data); // Log backend error details
      toast.error(error.response.data.message);
    } finally{
        setLoading(false)
    }
  };

  return (
    <div>
      <Navbar />
      <form
        onSubmit={submitHandler}
        className="flex items-center justify-center"
      >
        <div className=" flex items-center justify-center">
          <div className=" m-auto p-5 shadow-lg ">
            <div className="grid  grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                />
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Requirements</Label>
                <Input
                  type="text"
                  name="requirement"
                  value={input.requirement}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Salary</Label>
                <Input
                  name="salary"
                  type="number"
                  value={input.salary}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  name="location"
                  type="text"
                  value={input.location}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>JobType</Label>
                <Input
                  name="jobType"
                  type="text"
                  value={input.jobType}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Experience Level</Label>
                <Input
                  name="experienceLevel"
                  type="number"
                  value={input.experienceLevel}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>No. Of Position</Label>
                <Input
                  name="position"
                  type="text"
                  value={input.position}
                  onChange={changeEventHandler}
                />
              </div>
              {companies.length >= 0 ? (
                <Select onValueChange={changeSelectHandler}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Company</SelectLabel>
                      {companies.map((company) => (
                        <SelectItem value={company?.name?.toLowerCase()}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <span>No Company Registered till now </span>
              )}
            </div>

            <Button className="mt-5 w-full">Post New Job</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostJobs;
