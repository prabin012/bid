import  mongoose  from "mongoose";

const appiledJobs = new mongoose.Schema({
    
   userID:{
    type:String,
   },
    name:{
        type:String,
        
    },
    email:{
        type:String,
    }, 
    ProductID : {
        type:String,
    },
    OwnerName : {
        type:String,
    },
    userName : {
        type:String,
    },
    productName:{
        type:String,
        required:true
    },
    Per_bid:{
        type:Number,
        required:true
    },
    OriginalPrice:{
        type:String,
        required:true
    },
    BindingProice:{
        type:String,
        default:'',
    }
    
},{
    timestamps:{
        required:true
    }})

export const Aution = mongoose.model('Aution', appiledJobs)