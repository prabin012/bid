import mongoose from "mongoose";

const newCompaney = new mongoose.Schema({
    userID : {
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
        type:Number,
        required:true
    },
    BindingProice:{
        type:Number,
        default:'',
    },
    file:{
        type:String
    },
    status:{
        type:Boolean,
        default:false
    }
},
    {
        timestamps:{
            required:true
        }})

export const Bids = new mongoose.model('Bids', newCompaney);