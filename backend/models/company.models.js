import mongoose,{Schema} from "mongoose";

const companySchema = new Schema(
    {
        name : {
            type : String,
            required : true,
            unique : true
        },
        location : {
            type : String,
        },
        
        
        website : {
            type : String,
        },
        description : {
            type : String,
        },
        logo : {
            type : String
        },
        userId : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true
        }
       
    },{timestamps : true})

export const Company = mongoose.model("Company",companySchema)