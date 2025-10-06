import User from "../models/user.js"
import bcrypt from 'bcryptjs';
import generateToken from "../lib/utils.js"
import { sendWelcomeEmail } from "../emails/emailHnadlers.js";
import "dotenv/config"

const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "all fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be at least 6 characters" })
        }
        //cheak a valied email using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        } 

        // findOne is the correct mongoose method (case-sensitive)
        const user = await User.findOne({ email })
        if(user){
            return res.status(400).json({message:"email already exists"})
        }
        const hashpassword = await bcrypt.hash(password,10);

        // create and persist the user
        const newuser = new User({
            fullname: fullname,
            email: email,
            password: hashpassword
        })

        const savedUser = await newuser.save()

        if (savedUser) {
            // generateToken is expected to set auth cookie or return a token
            const token = generateToken(savedUser._id, res)
            // console.log("res",res)
            // console.log("token  ",token)
            res.status(201).json({ message: "user created successfully", user: savedUser })
            try {
                await sendWelcomeEmail(savedUser.email,savedUser.fullname,process.env.CLIENT_URL)
                
            } catch (error) {
                
            }
        } else {
            return res.status(400).json({ message: "invalid user details" })
        }


    } catch (error) {
        console.error("error from server", error)
        return res.status(500).json({ message: "server error" })
    }
}

export { signup }