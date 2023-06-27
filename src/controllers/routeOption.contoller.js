const RouteOption = require('../models/routeOption.model');

exports.getRouteOptions = async (req, res, next) => {

    const routeOptions = await RouteOption.findAll({order: [['id', 'ASC']]});
    res.json(routeOptions);

}