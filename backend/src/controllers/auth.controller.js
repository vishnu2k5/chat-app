import User from "../models/user.js"
import bcrypt from 'bcryptjs';
import generateToken from "../lib/utils.js"
import { sendWelcomeEmail } from "../emails/emailHnadlers.js";
import "dotenv/config"
import cloudinary from "../lib/cloudinary.js";

const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    // console.log(fullName, email, password )
    if (!fullName || !email || !password) {
            return res.status(400).json({ message: "all fields are required" })
        }
    try {
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
            fullname: fullName,
            email: email,
            password: hashpassword
        })

        const savedUser = await newuser.save()

        if (savedUser) {
            // generateToken is expected to set auth cookie or return a token
            const token = generateToken(savedUser._id, res)
            // console.log("res",res)
            // console.log("token  ",token)
            res.status(200).json({ message: "user created successfully", user: savedUser })
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



const login = async(req,res)=>{
    const { email, password } = req.body
    if(!email||!password) return res.status(400).json({message:"all fields are requires "})
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "invalid email or password" })
        }
        const match = bcrypt.compare(password,user.password)
       if (!match) {
            return res.status(400).json({ message: "invalid email or password" })
        }
       const token = generateToken(user._id,res);
       res.status(200).json({
      _id: user._id,
      fullName: user.fullname,
      email: user.email,
      profilePic: user.profilePic,})
    } catch (error) {

        console.error("there is an error ", error)
        return res.status(500).json({ message: "server error" })
    }


}

const logout = async(req,res)=>{
    res.cookie("jwt_token","",{maxAge : 0})
    res.status(200).json({message:"user loged out successfully "})

}


 const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) return res.status(400).json({ message: "Profile pic is required" });

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { signup,login,logout,updateProfile }