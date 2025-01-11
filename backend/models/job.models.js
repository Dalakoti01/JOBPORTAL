import mongoose,{Schema} from "mongoose";

const jobSchema = new Schema(
    {
        title : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        requirement : {
            type : String,
            required : true
        },
        salary : {
            type : Number,
            required : true
        },
        company : {
            type : Schema.Types.ObjectId,
            ref : "Company",
            required : true
        },
        location : {
            type : String,
            required : true
        },
        experienceLevel : {
            type : Number,
            required : true
        },
        position : {
            type : Number,
            required : true
        },
        jobType : {
            type : String,
            required : true
        },
        createdBy : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true

        },
        application : [
            {
                type : Schema.Types.ObjectId,
                ref : "Application"
            }
        ]

    },{timestamps : true})

export const Job = mongoose.model("Job",jobSchema)