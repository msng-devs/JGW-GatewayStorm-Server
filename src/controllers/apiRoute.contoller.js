const ApiRoute = require('../models/apiRoute.model');
const Method = require('../models/method.model');
const Service = require('../models/service.model');
const Role = require('../models/role.model');
const RouteOption = require('../models/routeOption.model');

const {ApplicationException, ApplicationErrorCode} = require("../utlis/exception/application.exception");

exports.getApiRoute = async (req, res, next) => {
    const apiRouteId = Number(req.params.id);
    const apiRoute = await ApiRoute.findByPk(apiRouteId);
    if (!apiRoute) throw new ApplicationException(ApplicationErrorCode.NOT_FOUND, "Api Route not found");
    res.json(apiRouteToJson(apiRoute));
};

exports.createApiRoute = async (req, res, next) => {

    const path = req.body.path;
    const methodId = Number(req.body.method);
    const roleId = (req.body.role_id) ? Number(req.body.role_id) : null;
    const serviceId = Number(req.params.serviceId);
    const routeOptionId = Number(req.body.option_id);


    if(routeOptionId === 4 && roleId === null) throw new ApplicationException(ApplicationErrorCode.NOT_FOUND, "RBAC option에는 Role이 필수입니다.");

    await checkExistForeignTable(methodId, roleId, serviceId, routeOptionId)
    await checkUnique(path, methodId, serviceId)

    if(path === "/api/v1/refresh/**" || path === "/api/v1/refresh") throw new ApplicationException(ApplicationErrorCode.NOT_FOUND, "refresh api는 생성할 수 없습니다.");

    const apiRoute = {
        path: path,
        method: methodId,
        role: roleId,
        service: serviceId,
        routeOption: routeOptionId,
    };
    const newApiRoute = await ApiRoute.create(apiRoute);
    res.json(apiRouteToJson(newApiRoute));
}

exports.findApiRouteById = async (req, res, next) => {

    const apiRouteId = Number(req.params.id);

    const apiRoute = await ApiRoute.findByPk(apiRouteId);
    if (!apiRoute) throw new ApplicationException(ApplicationErrorCode.NOT_FOUND, "Api Route not found");
    res.json(apiRouteToJson(apiRoute));
}

exports.findApiRouteByServiceId = async (req, res, next) => {
    const serviceId = Number(req.params.serviceId);
    const apiRoute = await ApiRoute.findAll({
        where: {
            service: serviceId,

        }, order: [['path', 'ASC'], ['id', 'DESC']]
    });

    res.json(apiRoute.map(apiRouteToJson));
}

exports.updateApiRoute = async (req, res, next) => {

    const apiRouteId = Number(req.params.id);
    const serviceId = Number(req.params.serviceId);
    const path = req.body.path;
    const methodId = Number(req.body.method);
    const roleId = (req.body.role_id) ? Number(req.body.role_id) : null;
    const routeOptionId = Number(req.body.option_id);


    if(path === "/api/v1/refresh/**" || path === "/api/v1/refresh") throw new ApplicationException(ApplicationErrorCode.NOT_FOUND, "refresh api는 생성할 수 없습니다.");

    const apiRoute = await ApiRoute.findByPk(apiRouteId);

    if (!apiRoute) throw new ApplicationException(ApplicationErrorCode.NOT_FOUND, "해당 라우트를 찾을 수 없습니다.");

    await checkExistForeignTable(methodId, roleId, serviceId, routeOptionId)

    if(routeOptionId === 4 && roleId === null) throw new ApplicationException(ApplicationErrorCode.NOT_FOUND, "RBAC option에는 Role이 필수입니다.");

    if(!checkIsSame({path:path,method:methodId,routeOption:routeOptionId},apiRoute)) {
        await checkUnique(req.body.path, req.body.method, apiRoute.service)
    }

    await apiRoute.update({
        path: path,
        method: methodId,
        role: roleId,
        routeOption: routeOptionId
    });

    res.json(apiRouteToJson(apiRoute));
}

exports.deleteApiRoute = async (req, res, next) => {
    const apiRouteId = Number(req.params.id);

    const apiRoute = await ApiRoute.findByPk(apiRouteId);
    if (!apiRoute) throw new ApplicationException(ApplicationErrorCode.NOT_FOUND, "해당 라우트를 찾을 수 없습니다.");
    await apiRoute.destroy();

    res.status(204).end();

}

const checkUnique = async (path, method, service) => {

    const apiRoute = await ApiRoute.findOne({
        where: {
            path: path, method: method, service: service
        }
    });
    if (apiRoute) throw new ApplicationException(ApplicationErrorCode.ALREADY_EXISTS, "이미 해당 서비스내에 같은 메소드와 같은 path를 지닌 route 정보가 있습니다.");
}

const checkExistForeignTable = async (methodId, roleId, serviceId, routeOptionId) => {

    let method = null;
    let role = null;
    let service = null;
    let routeOption = null;

    if (methodId) {
        method = await Method.findByPk(methodId);
        if (!method) throw new ApplicationException(ApplicationErrorCode.NOT_FOUND, "해당 Method를 찾을 수 없습니다.");
        return;
    }
    if (roleId) {
        role = await Role.findByPk(roleId);
        if (!role) throw new ApplicationException(ApplicationErrorCode.NOT_FOUND, "해당 Role을 찾을 수 없습니다.");
        return;
    }
    if (serviceId) {
        service = await Service.findByPk(serviceId);
        if (!service) throw new ApplicationException(ApplicationErrorCode.NOT_FOUND, "해당 Service를 찾을 수 없습니다.");
        return;
    }
    if (routeOptionId) {
        routeOption = await RouteOption.findByPk(routeOptionId);
        if (!routeOption) throw new ApplicationException(ApplicationErrorCode.NOT_FOUND, "해당 RouteOption을 찾을 수 없습니다.");
        return;
    }
    return {
        method: method, role: role, service: service, routeOption: routeOption
    }
}

const apiRouteToJson = (apiRoute) => {
    return {
        id: Number(apiRoute.id),
        path: String(apiRoute.path),
        role_id: (apiRoute.role === null) ? null : Number(apiRoute.role),
        method_id: Number(apiRoute.method),
        service_id: Number(apiRoute.service),
        route_option_id: Number(apiRoute.routeOption),
    }
}

const checkIsSame = (newApiRoute, oldApiRoute) => {
    return newApiRoute.path !== oldApiRoute.path || newApiRoute.method !== Number(oldApiRoute.method.id) || newApiRoute.routeOption !== Number(oldApiRoute.routeOption.id)
}