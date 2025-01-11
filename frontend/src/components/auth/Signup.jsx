import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading} = useSelector(store => store.auth)

  const [input,setInput] = useState({
    fullName : "",
    email : "",
    password : "",
    phoneNumber : "",
    role : "",
    file : ""
  })

  const changeEventHandler = (e) =>{
    setInput ({...input ,[e.target.name] : e.target.value})
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
}

  

  const onChange = async (e) => {
    e.preventDefault()
    console.log(input);
    const formData = new FormData()
    formData.append("fullName" , input.fullName)
    formData.append("email", input.email),
    formData.append("password",input.password),
    formData.append("phoneNumber",input.phoneNumber),
    formData.append("role",input.role)
    if(input.file){
      formData.append("file",input.file)
    }

    try {
      dispatch(setLoading(true))
      const res  = await axios.post(`${USER_API_ENDPOINT}/register`,formData,{
        headers : {
          "Content-Type" : "multipart/form-data"
        },
        withCredentials : true
        
      })

      if(res.data.success){
        navigate("/login")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }
    
  }
  return (
    <div>
      <Navbar />
      <div >
       <form onSubmit={onChange} className="p-5 gap-y-5 mx-auto w-1/2 flex flex-col  justify-center mt-10 border-slate-400 border-s-black border-2">
       <h2 className="text-center font-bold text-2xl">Sign Up</h2>
        <div className="flex flex-col gap-2">
          <Label>Full Name</Label>
          <Input
           type="text"
          placeholder="Enter Your Full Name"
          value = {input.fullName}
          name = "fullName"
          onChange = {changeEventHandler}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input
          type="email"
         placeholder="Enter Your Email"
         value = {input.email}
         name = "email"
         onChange = {changeEventHandler}
         />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Password</Label>
          <Input
         type="password"
        placeholder="Enter Your Password"
        value = {input.password}
        onChange = {changeEventHandler}
        name = "password"
         />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Phone Number</Label>
          <Input
          type="number" 
          placeholder="Enter Your Phone Number" 
          value = {input.phoneNumber}
          name = "phoneNumber"
          onChange = {changeEventHandler}
          />
        </div>

        <div className="flex " >
          <RadioGroup >
            <div className="flex gap-5">
            <div className="flex items-center space-x-2">
              <input 
              name = "role"
              type = "radio"
              value = "student"
              checked = {input.role === "student"}
              className = "cursor-pointer"
              onChange={changeEventHandler}
              />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
            <input 
              name = "role"
              type = "radio"
              value = "recruiter"
              checked = {input.role === "recruiter"}
              className = "cursor-pointer"
              onChange={changeEventHandler}
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
            </div>
            
          </RadioGroup>
        </div>

        <div className="flex  gap-10">
          <Label className = "  mt-2  border-s-slate-200">Profile</Label>
          <input 
          type = "file"
          accept = "file/*"
          onChange={changeFileHandler}
          className = "cursor-pointer w-60"
          />
        </div>

        {
          loading? <Button><Loader2 className="w-full m-4"/>Please Wait</Button> : <div className="flex flex-col gap-2">
          <Button type = "submit">Sign Up</Button>
        </div>
        }



        <div>
          <p className="text-sm">Already Have a Account ? <Link className = "cursor-pointer" to ="/login">Sign Up</Link></p>
        </div>
       </form>
      </div>
    </div>
  );
};

export default Signup;
