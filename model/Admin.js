import  mongoose  from "mongoose";

const newAdmin = new mongoose.Schema({
    name:{
        type:String,
    }, 
    email:{
        type:String,
        unique:true
    }, 
    password:{
        type:String,
     
    }
})

export const Admin = mongoose.model('Admin', newAdmin)