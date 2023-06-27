const Method = require('../models/method.model');

exports.getPing = async (req, res, next) => {
    res.json("PONG");
}