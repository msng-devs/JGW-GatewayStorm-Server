const Method = require('../models/method.model');

exports.getMethods = async (req, res, next) => {
    const methods = await Method.findAll({order: [['id', 'ASC']]});
    res.json(methods);
}