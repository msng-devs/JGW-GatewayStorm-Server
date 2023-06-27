const { createSchemaValidation } = require("../utlis/schemaCreator");
const { apiRouteUpdateSchema , apiRouteAddSchema } = require( "../schema/apiRoute.schema");
const{ processAuthentication }= require('../middleware/authentication.middleware');

const express = require("express");
const {param} = require("express-validator");
const router = express.Router();

const serviceIdWithId = [
    param('serviceId').exists().isInt({ min: 1 }).withMessage('serviceId는 양수여야 합니다.'),
    param('id').exists().isInt({ min: 1 }).withMessage('routeId 는 양수여야 합니다.'),
]
const serviceId = [
    param('serviceId').exists().isInt({ min: 1 }).withMessage('serviceId는 양수여야 합니다.')
]
router.put("/:serviceId/apiRoute/:id",[createSchemaValidation(apiRouteUpdateSchema,serviceIdWithId),processAuthentication], require("../controllers/apiRoute.contoller").updateApiRoute);
router.delete("/:serviceId/apiRoute/:id",[createSchemaValidation([],serviceIdWithId),processAuthentication]  ,require("../controllers/apiRoute.contoller").deleteApiRoute);
router.get("/:serviceId/apiRoute/:id",[createSchemaValidation([],serviceIdWithId),processAuthentication] ,require("../controllers/apiRoute.contoller").findApiRouteById);
router.post("/:serviceId/apiRoute",[createSchemaValidation(apiRouteAddSchema,serviceId),processAuthentication], require("../controllers/apiRoute.contoller").createApiRoute);
router.get("/:serviceId/apiRoute/",[createSchemaValidation([],serviceId),processAuthentication] ,require("../controllers/apiRoute.contoller").findApiRouteByServiceId);


module.exports = router;