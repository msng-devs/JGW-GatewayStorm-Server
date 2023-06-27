const {validationResult} = require("express-validator");

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            timestamp: new Date(),
            status: 400,
            error: "Invalid Request Body",
            message: errors.array(),
            code: "None",
            path: req.url
        });
    }
    next();
}

module.exports = {validator};