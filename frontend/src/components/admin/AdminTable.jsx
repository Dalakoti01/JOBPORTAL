import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";

const AdminTable = () => {
  const { adminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(adminJobs);

  useEffect((e) => {
    const filteredJobs =
      adminJobs.length >= 0 &&
      adminJobs.filter((jobs) => {
        if (!searchJobByText) {
          return true;
        }
        return jobs?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase()) || jobs?.title?.toLowerCase().includes(searchJobByText.toLowerCase());
      });
      setFilterJobs(filteredJobs)
  }, [adminJobs,searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <tr>
              
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2
                        onClick={() =>
                          navigate(`admin/companies/${company._id}`)
                        }
                        className="w-4"
                      />
                      <span>Edit</span>
                    </div>
                    <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className=" cursor-pointer flex gap-2 mt-2">
                      <Eye/>
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminTable;
