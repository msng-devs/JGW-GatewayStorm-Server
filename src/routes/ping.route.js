const express = require("express");
const router = express.Router();
const{ processAuthentication }= require('../middleware/authentication.middleware');


router.get("/auth",processAuthentication,require("../controllers/ping.contoller").getPing);
router.get("/",require("../controllers/ping.contoller").getPing);

module.exports = router;