import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name : "job",
    initialState : {
        allJobs : [],
        adminJobs : [],
        singleJob : null,
        searchJobByText : "",
        appliedjobs : [],
        searchQuery : ""
    },
    reducers :{
        setAllJobs : (state , action) => {
            state.allJobs = action.payload
        },

        setSingleJob : (state,action) => {
            state.singleJob = action.payload

        },
        setAdminJobs : (state,action) => {
            state.adminJobs = action.payload
        },
        setSearchJobByText : (state,action) => {
            state.searchJobByText = action.payload
        },
        setAppliedJobs : (state,action) => {
            state.appliedjobs = action.payload
        },
        setSearchQuery : (state,action) => {
            state.searchQuery = action.payload
        }
    }
})

export const {setAllJobs} = jobSlice.actions
export const {setSingleJob,setAdminJobs,setSearchJobByText,setAppliedJobs,setSearchQuery} = jobSlice.actions
export default jobSlice.reducer