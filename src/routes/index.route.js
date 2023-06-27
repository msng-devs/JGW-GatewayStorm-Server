const express = require("express");
const path = require("path");
const fs = require('fs');

const router = express.Router();

router.get("*", function(req, res) {
    res.render('index');
});

module.exports = router;