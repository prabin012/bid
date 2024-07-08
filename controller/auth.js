import { Admin } from "../model/Admin.js";
import { User } from "../model/user.js";
import bcrypt from 'bcrypt'
import path from "path";

// Register function
export const Register = async(req, res) => {

    const { name, email, password,phone,Address,images } = req.body;
   
    try {
        const isUser = await User.findOne({ email });
      
      
        if (isUser) {
            return res.status(404).json({
                success: false,
                message: "User already exists...."
            })
        }
       
        const salt = await bcrypt.genSalt(10)
        const hashpashword = await bcrypt.hash(password, salt)
       
        await User.create({
            name: name,
            email: email,
            password: hashpashword,
            phone,
            Address,
            file:req.body.images
        });
        res.status(201).json({
            message: "Register Successfully..",
            success: true,
            User,
        })
    } catch (error) {
        console.log("error", error)
    }
}

// Login function
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        // const users = await Teacher.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user cannot find !"
            })
        }
        const userpassword = await bcrypt.compare(password, user.password);
        if (!userpassword) {
            return res.status(401).json({
                success: false,
                message: "password dosn't match !"
            })
        }
        res.status(201).json({
            success: true,
            message: "successfull Login..",
            user
        })
    } catch (error) {
        console.log("error", error);
    }
}


//Teacher rigister

export const Adminreg = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const isAdmin = await Admin.findOne({ email });
        if (isAdmin) {
            return res.status(404).json({
                success: false,
                message: "Admin already exists...."
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashpashword = await bcrypt.hash(password, salt)
        await Admin.create({
            name: name,
            email: email,
            password:hashpashword,
        });
        res.status(201).json({
            message: "Register Successfully..",
            success: true,
           
        })
    } catch (error) {
        console.log("error", error)
    }
}

//TeacherLogin
export const AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Admin.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user cannot find !"
            })
        }
        const userpassword = await bcrypt.compare(password, user.password);
        if (!userpassword) {
            return res.status(401).json({
                success: false,
                message: "password dosn't match !"
            })
        }
        res.status(201).json({
            success: true,
            message: "successfull Login..",
            user
        })
    } catch (error) {
        console.log("error", error);
    }
}


