import { google } from "googleapis";
import { config } from "dotenv";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
config();

const oAuth = new google.auth.OAuth2(
  process.env.GOOGLE_ID,
  process.env.GOOGLE_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

oAuth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH });

export const sendDistressMail = async (email: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "codelabbest@gmail.com",
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH,
        accessToken,
      },
    });

    const html = await ejs.renderFile(
      path.join(__dirname, "./views/index.ejs")
    );

    transport
      .sendMail({
        from: "SPEECH APP <abbeyrufai234@gmail.com>",
        to: email,
        subject: "Distress Mail",
        html,
      })
      .then(() => {
        console.log("sent");
      })
      .catch(() => {
        console.error();
      });
  } catch (error) {
    console.log(error);
  }
};
