import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowBigLeft, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/constants";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useGetCompanyById } from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    location: "",
    website: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      location: singleCompany.location || "",
      website: singleCompany.website || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    console.log(input);
    console.log(formData);

    try {
      setLoading(true)
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl flex flex-col justify-center items-center mt-7 m-auto">
        <form onSubmit={submitHandler}>
          <div className="flex  justify-center gap-8 items-center">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
            >
              <ArrowBigLeft />
              Back
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>

          <div className="mt-5 flex justify-center gap-5">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
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
          </div>
          <div className="mt-5 flex justify-center gap-5">
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col items-center ">
            <Label className="font-bold text-xl">Logo</Label>
            <Input
              className="w-40 mt-5"
              type="file"
              accept="image/*"
              onChange={fileHandler}
            />
          </div>
          <div>
            {
              loading ? <Button className="mt-6 w-full"><Loader2/>Please Wait</Button> : <Button className = "w-full mt-6" type = "submit">Update</Button>
            }
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
