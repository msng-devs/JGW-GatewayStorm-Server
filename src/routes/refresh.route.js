const express = require("express");
const router = express.Router();
const{ processAuthentication }= require('../middleware/authentication.middleware');


router.post("/",require("../controllers/refresh.contoller").getOk);

module.exports = router;