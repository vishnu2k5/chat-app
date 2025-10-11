import User from "../models/user.js"
import jwt from "jsonwebtoken"
import "dotenv/config"




const protectRoute = async(req,res,next)=>{
    try {
    const token = req.cookies.jwt_token
    if(!token) return res.status(401).json({message:"unauthorized - no token provided"})
    

    const decode = jwt.verify(token,process.env.JWT_SECRET)
    if(!decode)return res.status(401).json({message:"unauthorized - invalid token provided"})
    
    const user = await User.findById(decode.userId).select("-password")
    if(!user)return res.status(404).json({message:"user not found"})
    
    req.user = user
    next()

    } catch (error) {
        console.error("there ia an error ",error)
        res.status(500).json({ message: "Internal server error" });
    }

}

export { protectRoute}