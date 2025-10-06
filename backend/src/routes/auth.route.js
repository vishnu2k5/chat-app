import express from 'express';

const router = express.Router()
import {signup} from "../controllers/auth.controller.js"



router.post('/signup', signup); 
 router.get('/login', (req, res) => {
    res.send('signin');
}   ); 
router.get('/logout', (req, res) => {
    res.send('signout');
}   ); 




export default router;