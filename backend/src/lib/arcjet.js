import "dotenv/config"
import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";


const aj = arcjet({
  // Get your site key from https://app.arcjet.com and set it as an environment
  // variable rather than hard coding.
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
         // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following // Google, Bing, etc


    // detectBot({
    //   mode: "LIVE",
    //   allow: [
    //     "CATEGORY:SEARCH_ENGINE", 
        
    //   ],
    // }),


    // Create a slidingwindow rate limit. Other algorithms are supported.
   slidingWindow({
    mode:"LIVE",
    max:100,
    interval:60
   }),
  ],
});


export{aj}
