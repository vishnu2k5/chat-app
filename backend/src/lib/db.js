import mongoose from 'mongoose'

export const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI).then(()=>{console.log('mongosdb connected');
        })
    } catch (error) {
        console.log("there is an error",error);
        process.exit(1)//1 status mean failed and 0 mean success
    }
}


 