import { Application } from "../models/application.models.js";
import { Job } from "../models/job.models.js";

export const applyJob = async(req,res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if(!jobId){
            return res.status(400).json({
                message : "No such job with found woth this id ",
                success : false
            })
        }

        const existingApplication = await Application.findOne({job : jobId,applicant : userId})

        if(existingApplication){
            return res.status(400).json({
                message : "Already Applied for this job",
                success : false
            })
        }
        
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(400).json({
                message : "No such jobs found",
                success : false
            })
        }

        

        const newApplication = await Application.create({
            job : jobId,
            applicant : userId
        })
        
        await job.application.push(newApplication._id);
        await job.save();
        return res.status(200).json({
            message : "Successfully applied for job",
            success : true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getAppliedJob = async(req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant : userId}).sort({createdAt : -1}).populate({
            path : "job",
            options : {sort : {createdAt : -1}},
            populate:{
                path : "company",
                options : {sort : {createdAt : -1}}
            }
        })

        if(!application){
            return res.status(400).json({
                message : "No such Application found",
                success : false
            })
        }

        return res.status(200).json({
            application,
            message : "Job applied Successfully",
            success : true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getApplicants = async (req,res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path : "application",
            option : {sorted : {createdAt : -1}},
            populate : {
                path : "applicant"
            }
        })

        if(!job){
            return res.status(400).json({
                message : "No job found with such applicant",
                success : false
            })
        }

        return res.status(200).json({
            message : "JOb found with such applicant",
            success : true,
            job
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const updateStatus = async(req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;

        if(!status){
            return res.status(400).json({
                message : "status is required",
                success : false
            })
        }

        const application = await Application.findById(applicationId);
        if(!application){
            return res.status(400).json({
                message : "Application not found",
                success : false
            })
        }

        application.status = status;
        await application.save();
        return res.status(200).json({
            message : "Status Updated Successfully",
            success : true
        })
    } catch (error) {
        console.log(error);
        
    }
}