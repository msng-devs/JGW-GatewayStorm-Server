const Service = require('../models/service.model');
const {createPage} = require("../utlis/pagenation");
const {ApplicationException, ApplicationErrorCode} = require("../utlis/exception/application.exception");

exports.getServices = async (req, res, next) => {

    const services = await Service.findAll({
        order: [['id', 'DESC']]
    });
    res.json(services.map(serviceToJson));
};

exports.createService = async (req, res, next) => {

    await checkUniqueName(req.body.name);
    await checkUniqueDomain(req.body.domain);
    checkDomain(req.body.domain);
    const service = {
        name: req.body.name, domain: req.body.domain, index: req.body.index
    }
    const newService = await Service.create(service);
    res.json(serviceToJson(newService));
}

exports.findServiceById = async (req, res, next) => {

    const service = await Service.findByPk(req.params.id);
    if (!service) throw new ApplicationException(ApplicationErrorCode.NOT_FOUND, "해당 서비스를 찾을 수 없습니다.");
    res.json(serviceToJson(service));

}

exports.updateService = async (req, res, next) => {

    const service = await Service.findByPk(req.params.id);
    if (!service) throw new ApplicationException(ApplicationErrorCode.NOT_FOUND, "해당 서비스를 찾을 수 없습니다.");

    if(service.name !== req.body.name) await checkUniqueName(req.body.name);
    if(service.domain !== req.body.domain) await checkUniqueDomain(req.body.domain);

    checkDomain(req.body.domain);
    await service.update({
        name: req.body.name, domain: req.body.domain, index: req.body.index
    });
    res.json(serviceToJson(service));

}

exports.deleteService = async (req, res, next) => {

    const service = await Service.findByPk(req.params.id);
    if (!service) throw new ApplicationException(ApplicationErrorCode.NOT_FOUND, "해당 서비스를 찾을 수 없습니다.");

    await service.destroy();
    res.status(204).end();

}

const checkUniqueDomain = async (domain) => {
    const serviceDomain = await Service.findOne({
        where: {
            domain: domain
        }
    });

    if (serviceDomain) throw new ApplicationException(ApplicationErrorCode.ALREADY_EXIST, "이미 해당 도메인은 사용중입니다.");
}
const checkUniqueName = async (name) => {

    const serviceName = await Service.findOne({
        where: {
            name: name
        }
    });

    if (serviceName) throw new ApplicationException(ApplicationErrorCode.ALREADY_EXIST, "이미 해당 이름은 사용중입니다.");
}
const serviceToJson = (service) => {
    return {
        id: Number(service.id), name: String(service.name), domain: String(service.domain), index: String(service.index)
    }
}

function checkDomain(url) {
    const regex = /^(http:\/\/|https:\/\/)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(:\d+)?(\/.*)?$/;

    // Check if the URL matches the regular expression
    if (!regex.test(url)) {
        return false;
    }

    // Check if the URL starts with 'http://' or 'https://'
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return false;
    }

    // Check if the URL is valid when 'http://' or 'https://' is removed
    const withoutProtocol = url.replace(/^(http:\/\/|https:\/\/)/, '');
    const parts = withoutProtocol.split(':');

    if (parts.length === 2) {
        // Check if the port is a valid number
        const port = parseInt(parts[1]);
        if (isNaN(port)) {
            return false;
        }
    }

    // Check if the domain is valid
    const domain = parts[0];
    if (!domain || !/^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/.test(domain)) {
        return false;
    }

    return true;
}