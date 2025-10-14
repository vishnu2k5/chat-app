import jwt from "jsonwebtoken"

const generateToken = async(userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"1d",
    })

    const isDev = process.env.NODE_ENV !== 'production'
    res.cookie("jwt_token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: isDev ? 'lax' : 'strict',
        secure: isDev ? false : true,
        path: '/',
    })
    return token
}


export default generateToken;