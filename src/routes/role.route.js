const express = require("express");
const router = express.Router();
const{ processAuthentication }= require('../middleware/authentication.middleware');
router.get("/", processAuthentication,require("../controllers/role.contoller").getRoles);
module.exports = router;