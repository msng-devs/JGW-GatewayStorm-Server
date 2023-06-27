const admin = require("firebase-admin");
const {processAuthentication} = require("../src/middleware/authentication.middleware");
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const env = process.env.NODE_ENV || 'local';

if(env !== 'test'){
    admin.initializeApp({
        credential: admin.credential.cert('./resource/firebase.json'),
    });
    console.log("firebase admin initialized");
}

module.exports.admin = admin;