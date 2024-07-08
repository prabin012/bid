import { Bids } from "../model/companey.js";
import { Admin } from "../model/Admin.js";
import { User } from "../model/user.js";
import { Aution } from "../model/Appliedjob.js";


export const AddCompaney = async(req, res)=>{
    const {productName, price, BindingProice, OriginalPrice,images } = req.body;
    const {id} = req.params;
    try {
    const isCompaney = await Admin.findById(id);
    const isUser = await User.findById(id);
    if(!isCompaney && !isUser){
       
        return res.status(404).json({
            success:false,
            message:"User is not Registerd Sorry !!"
        })
    }
    
    else{
        await Bids.create({
            userID:isCompaney?isCompaney._id:isUser._id,
            userName:isCompaney?isCompaney.name:isUser.name,
            productName,
            Per_bid:price,
            BindingProice,
            OriginalPrice,
            file:images,
            
        })
        res.status(201).json({
            success:true,
            message:"Item has been Added Successfully.."
        })
    }
   
    } catch (error) {
    //    res.status(500).json({message:"something went to wrong !", error}) 
    console.log(error)
    }
    
}


export const getJob = async(req, res)=>{
    try {
        const AllJobs = await Bids.find({status:true});
        res.status(200).json({
            AllJobs
        })
    } catch (error) {
        console.log(error)
    }
}
export const getallJob = async(req, res)=>{
    try {
        const AllJobs = await Bids.find();
        res.status(200).json({
            AllJobs
        })
    } catch (error) {
        console.log(error)
    }
}

export const accepBids = async(req, res)=>{
    const {id} = req.params;
    try {
        const isBids = await Bids.findById(id);
        await isBids.updateOne({
            status:true,
        })
        res.status(200).json({
            success:true,
            message:"Bid Added Successfully.."
        })
    } catch (error) {
        console.log(error)
    }
}
export const deleteBids = async(req, res)=>{
    const {id} = req.params;
    try {
        const isBids = await Bids.findById(id);
        // const isAuction = await Aution.findOne({ProductID:id})
        await isBids.deleteOne();
        // await isAuction.deleteOne();
        await
        res.status(200).json({
            success:true,
            message:"Deleted Successfully.."
        })
    } catch (error) {
        console.log(error)
    }
}