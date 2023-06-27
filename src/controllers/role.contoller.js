const role = require("../models/role.model");

exports.getRoles = async (req, res, next) => {

    const roles = await role.findAll({order: [['id', 'ASC']]});
    res.json(roles);

}