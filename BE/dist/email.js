"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDistressMail = void 0;
const googleapis_1 = require("googleapis");
const dotenv_1 = require("dotenv");
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)();
const oAuth = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_ID, process.env.GOOGLE_SECRET, process.env.GOOGLE_REDIRECT_URL);
oAuth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH });
const sendDistressMail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
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
        const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "./views/index.ejs"));
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
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendDistressMail = sendDistressMail;
