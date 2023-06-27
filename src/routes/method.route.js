const express = require("express");
const router = express.Router();
const{ processAuthentication }= require('../middleware/authentication.middleware');

router.get("/",processAuthentication,require("../controllers/method.contoller").getMethods);
module.exports = router;