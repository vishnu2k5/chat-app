//nowt working as expected 


export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Messenger</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f7fb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f4f7fb; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 18px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background: linear-gradient(135deg, #36D1DC, #5B86E5); padding: 35px;">
                <img src="https://cdn-icons-png.flaticon.com/512/889/889140.png" alt="Messenger Logo" style="width: 80px; height: 80px; background-color:white; border-radius:50%; padding:10px;">
                <h1 style="color: #ffffff; font-size: 26px; font-weight: 600; margin: 20px 0 0;">Welcome to Messenger!</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 35px 40px;">
                <p style="font-size: 18px; color: #5B86E5; font-weight: 600;">Hi ${name},</p>
                <p style="font-size: 16px; line-height: 1.7; margin-top: 0;">
                  We’re thrilled to have you on board! Messenger is your new home for fast, fun, and secure communication — connecting you effortlessly with friends, family, and colleagues.
                </p>

                <div style="background-color: #f9fafc; padding: 20px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #36D1DC;">
                  <p style="margin: 0 0 10px 0; font-weight: 600;">Here’s how to get started:</p>
                  <ul style="padding-left: 20px; margin: 0; font-size: 15px;">
                    <li>Customize your profile picture and bio.</li>
                    <li>Search and connect with your friends.</li>
                    <li>Start your first conversation instantly.</li>
                    <li>Share your favorite photos, emojis, and moments.</li>
                  </ul>
                </div>

                <div style="text-align: center; margin: 35px 0;">
                  <a href="${clientURL}" style="background: linear-gradient(to right, #36D1DC, #5B86E5); color: #ffffff; text-decoration: none; padding: 14px 35px; border-radius: 30px; font-weight: 600; display: inline-block; letter-spacing: 0.5px;">Open Messenger</a>
                </div>

                <p style="font-size: 15px; line-height: 1.6;">
                  Need help? Our support team is just a message away — we’re here to make sure you have the best experience possible.
                </p>

                <p style="margin-top: 25px; font-size: 15px;">
                  Cheers,<br>
                  <strong>The Messenger Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background-color:#f0f2f7; padding: 20px; font-size: 12px; color: #888;">
                <p style="margin: 0;">© 2025 Messenger. All rights reserved.</p>
                <p style="margin: 8px 0;">
                  <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 10px;">Privacy Policy</a> |
                  <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 10px;">Terms</a> |
                  <a href="#" style="color: #5B86E5; text-decoration: none; margin: 0 10px;">Contact</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
