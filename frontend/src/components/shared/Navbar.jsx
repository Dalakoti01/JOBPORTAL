import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/constants";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  // const user = true
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.success(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-between">
      <div className="ml-10 mt-4">
        <h2 className="font-bold text-2xl ">
          Direct<span className="text-red-700">Connect</span>
        </h2>
      </div>
      <div>
        <ul className="flex justify-between gap-4 mr-10 mt-4 text-xl cursor-pointer">
          {user && user.role === "recruiter" ? (
            <>
              <li>
                {" "}
                <Link to="/admin/companies">Companies</Link>{" "}
              </li>
              <li>
                <Link to="/admin/Jobs">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                {" "}
                <Link to="/">Home</Link>{" "}
              </li>
              <li>
                <Link to="/Jobs">Jobs</Link>
              </li>
              <li>
                <Link to="/Browse/">Browse</Link>
              </li>
            </>
          )}

          {!user ? (
            <div className="flex gap-4">
              <Link to="/signup">
                {" "}
                <Button variant="outline">Sign Up</Button>
              </Link>

              <Link to="/login">
                <Button className="bg-purple-700 hover:bg-purple-800">
                  Log In
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h3>{user?.fullName}</h3>
                      <p className="text-sm">
                      {user?.profile?.bio ? user.profile.bio : <span>A Recruiter</span>}
                      </p>
                    </div>
                  </div>
                  <div className=" mt-4 flex flex-col gap-4">
                    {
                      user && user.role === "student" ? 
                      <>
                      <Button variant="outline">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                      </> : <></>
                    }
                    
                    <Button onClick={logoutHandler} variant="outline">
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
