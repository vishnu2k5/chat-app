//nowt working as expected 

import { Resend } from "resend";
// import { ENV } from "./env.js";
import "dotenv/config"

export const resendClient = new Resend(process.env.RESEND_API_KEY);

export const sender = {
  email: process.env.EMAIL_FROM,
  name: process.env.EMAIL_FROM_NAME,
  
};