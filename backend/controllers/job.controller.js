import {Job} from "../models/job.models.js"

export const createJob = async (req,res) =>{
    try {
        const {title,description,requirement,salary,companyId ,location,experienceLevel,position,jobType} = req.body;
        const userId = req.id // middleware

        if(!title || !description || !requirement || !salary || !companyId  || !experienceLevel || !location || !position || !jobType){            
            return res.status(400).json({
                message : "All fields are mandotory to be filled before creating for a job",
                success : false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirement,
            salary,
            company: companyId, 
            location,
            experienceLevel,
            position,
            jobType,
            createdBy : userId
        })
        
        if(!job){
            return res.status(400).json({
                message : "JOb not created",
                success : false
            })
        }

        return res.status(201).json({
            job,
            message : "Job created successfully",
            success : true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getAllJob = async(req,res) => {
    try {
        const keyword = req.query.keyword || "" //this is used to get the query parameter from the URL of an incoming http request
        const query = {
            $or : [
                {title : {$regex : keyword,$options : "i"}}, // regex is used so that whatever keyword we search like developer so it searches all
                                                            // the jobs that contain the keyword developers not just the keyword developer eg: frontend developer
                {description : {$regex : keyword , $options : "i"}} // option is used to make our searches free from case sensitivity
            ]
        };

        const jobs = await Job.find(query).populate({
            path : "company"
        }).sort({createdAt : -1})


        if(!jobs){
            return res.status(400).json({
                message : "Jobs not found",
                success : false
            })
        }

        return res.status(200).json({
            jobs,
            success : true,
            message : "Jobs found"
        })
    } catch (error) {
        console.log("eroor aa gayi");
        
        console.log(error);
        
    }
}

export const getJobById = async (req,res) => {
    try {
        console.log("program started");
        
        const userId = req.params.id
        console.log("id fetched");
        
        const job = await Job.findById(userId).populate(
           { path : "application"}
        )
        
        if(!job){
            return res.status(400).json({
                message : "No such job found",
                success : false
            })
        }

        return res.status(200).json({
            message: "jOB FOUND",
            success : true,
            job
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getAdminJob = async(req,res) => {
    try {
        const adminId = req.id
        let jobs = await Job.find({createdBy: adminId}).populate({
            path : "company",
            createdAt : -1
        })
        if(!jobs){
            return res.status(404).json({
                message : "There is not such job",
                success : false
            })
        }

        return res.status(200).json({
            jobs,
            success : true,
            message : "Admin Jobs Found"
        })


    } catch (error) {
        console.log(error);
        
    }
}