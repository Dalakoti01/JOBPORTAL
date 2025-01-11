import cloudinary from "../db/cloudinary.js";
import getDataUri from "../db/datauri.js";
import { Company } from "../models/company.models.js";

export const registerCompany = async (req,res) => {
    try {
        console.log("Function Started");
        
        const {companyName} = req.body;
        if(!companyName){
            return res.status(200).json({
                message : "You need to enter the company name to create it",
                success : false
            })
        }

        let company = await Company.findOne({companyName});
        if(company){
            return res.status(400).json({
                message : "You can create company with same name again",
                success : false
            })
        }

        company = await Company.create({
            name : companyName,
            userId : req.id
        })

        return res.status(201).json({
            company,
            success : true,
            message : "Company registered successfully "
        })
        

        
    } catch (error) {
        console.log(error);
        
    }
}

export const getCompany = async (req,res)=>{
    try {
        const userId = req.id //middleware
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(400).json({
                message : "No company registered with such id",
                success : false
            })
        }

        return res.status(200).json({
            companies,
            message : "Company details found",
            success : true

        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getCompanyById = async(req,res) =>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(400).json({
                message : "No company found with such id",
                success : false
            })
        }

        return res.status(200).json({
            company,
            message : "Company details found",
            success : true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const updateCompany = async(req,res) => {
    try {
        const {name,location,website,description} = req.body;
        console.log({name,location,website,description});

        const file =  req.file;
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const logo = cloudResponse.secure_url
        const updateCompany = {name,location,website,description,logo}
        const company = await Company.findByIdAndUpdate(req.params.id,updateCompany,{new : true})

        if(!company){
            return res.status(400).json({
                message : "Company Not Found",
                success : false
            })
        }
        

        return res.status(200).json({
            company,
            message : "Company Information Updated",
            success : true
        })
    } catch (error) {
        console.log(error);
        
    }
}