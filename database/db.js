import  mongoose  from "mongoose";

export const dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL+'ArtGallery')
    .then(()=>{
        console.log("db Coonected")
        
    }).catch(()=>{
        console.log("error")
    })
}