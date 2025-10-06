import jwt from "jsonwebtoken"

const generateToken = async(userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"1d",
    })

    res.cookie("jwt_token",token,{
        maxAge:1*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV==='devlopment'?false:true
    })
    return token
}


export default generateToken;