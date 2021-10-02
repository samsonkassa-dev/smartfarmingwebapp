require('dotenv').config();

module.exports = {
    SECRET: process.env.APP_SECRET,
    DB: process.env.APP_DB,
    PORT: process.env.APP_PORT,
    USERNAME: process.env.MAIL_USERNAME,
    PASSWORD: process.env.MAIL_PASSWORD,
    CLIENTID: process.env.OAUTH_CLIENTID,
    CLIENTSECRET: process.env.OAUTH_CLIENT_SECRET,
    REFRESH: process.env.OAUTH_REFRESH_TOKEN,
    SGSECRET: process.env.SG_SECRET
}