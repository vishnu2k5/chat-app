import express from 'express';
import dotenv from "dotenv";
import path from "path"
import authRouter from './routes/auth.route.js';
import messageroute from './routes/messages.route.js'
import { connectDb } from './lib/db.js';
import cookieparser from "cookie-parser"


dotenv.config();
const app = express();
const PORT = process.env.PORT || 4001;
//making ready for diployment 
const __dirname = path.resolve()



//middleware for form data 
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieparser())




//all app routes
app.use('/api/auth',authRouter)
app.use('/api/message',messageroute)













//if production ready diploy
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,'../frontend/dist')))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb()


});