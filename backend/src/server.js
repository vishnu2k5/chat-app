import express from 'express';
import dotenv from "dotenv";

import authRouter from './routes/auth.route.js';
import messageroute from './routes/messages.route.js'


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/auth',authRouter)
app.use('/api/message',messageroute)















app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});