import { Aution } from "../model/Appliedjob.js";
import { Bids } from "../model/companey.js";
import { User } from "../model/user.js";
export const ApliedJob = async(req, res)=>{
    const {iid , jid}= req.params;
    // const {Location,name,number,price,rating}= req.body;
    try {
        const isUser = await User.findOne({_id: iid});
        const isItem = await Bids.findOne({_id: jid});
        const isBid = await Aution.findOne({ $and :[{ProductID:isItem._id , email:isUser.email}]});
        if(isItem.userID===iid){
            return res.status(500).json({
                success:false,
                message:"❌  OPPS ! ,You Cannot Bid Yourself  Thank You "
            })
        }
        if(!isUser){
            return res.status(404).json({
                success:false,
                message:"Register For Biding...."
            })
        }

        if(isBid===null){
            
        const Autions = new Aution({
            userID:isUser._id,
            name:isUser.name,
            email:isUser.email,
            ProductID:isItem._id,
            userName:isItem.name,
            productName:isItem.productName,
            OwnerName:isItem.userName,
            Per_bid:isItem.Per_bid,
            OriginalPrice:isItem.OriginalPrice,
            BindingProice:isItem.BindingProice+isItem.Per_bid,
            
        })
        await Autions.save();
        await isItem.updateOne({
            BindingProice:isItem.BindingProice+isItem.Per_bid
        })
        res.status(201).json({
            success:true,
            message:"Congratulations, 🎉 Bid has been added Successfully....."
        })
           return;
        }
        
        return res.status(404).json({
            success:false,
            message:"You have already completed the bid..."
        })
      
    } catch (error) {
        console.log(error)
    }
}

export const getApplied = async(req, res)=>{
    try {
        const {iid} = req.params;
        const isUser = await User.findById(iid);
        const Auctions = await Aution.find({email:isUser.email})
        if(!Auctions){
            return res.status(404).json({
                success:false,
                message:"Empty..."
            })
        }
        res.status(201).json({
            success:true,
            message:"Feteched Successfully...",
            Auctions
        })
    } catch (error) {
        console.log(error)
    }
}
export const getApplieds = async(req, res)=>{
    try {
        const Auctions = await Aution.find()
        console.log(Auctions)
        res.status(201).json({
            success:true,
            message:"Feteched Successfully...",
            Auctions
        })
    } catch (error) {
        console.log(error)
    }
}