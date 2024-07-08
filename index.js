import express from 'express'
import { dbConnect } from './database/db.js';
import multer, { diskStorage } from 'multer'

import newschema from './routes/route.js'
import cors from 'cors'
import bodyParser from 'body-parser';
import dotenv, { config } from 'dotenv';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

dotenv.config();

dbConnect();
app.use(cors());
//config env connection
config({
    path : "./connection/config.env",
})
app.use(express.static(path.join(__dirname, "public/images")))

app.use("/images", express.static(path.join(__dirname, "public/images")));


app.use(cors());
app.use(bodyParser.json())
app.use(express.json())
app.use('/api', newschema);


export const upload = multer({
    storage:diskStorage({
        destination:function(req, file, cb)
        {
            cb(null,  'public/images/')
        },
        filename:function(req, file, cb)
        {
            cb(null, req.body.name);
        }
    })
});

app.post('/api/upload', upload.single("file"), async(req, res)=>{
   if (!req.file){
        return res.status(404).json({
            success:false,
            message:"file not Found"
        })
    }
    res.status(201).json({
        success:true,
        message:"File Uploaded....."
    })
})

  
const port = process.env.PORT
app.listen(port,()=>{
    console.log("server is running on port ", port)
})