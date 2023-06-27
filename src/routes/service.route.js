const { checkSchema, param} = require('express-validator')
const {serviceAddSchema, serviceUpdateSchema} = require('../schema/service.schema')
const { createSchemaValidation } = require("../utlis/schemaCreator");
const express = require("express");
const router = express.Router();
const{ processAuthentication }= require('../middleware/authentication.middleware');


const id = [param('id').exists().isInt({ min: 1 }).withMessage('서비스 Id 는 양수여야 합니다.'),]

router.get("/", processAuthentication ,require("../controllers/service.contoller").getServices);
router.get("/:id",[createSchemaValidation([],id),processAuthentication] , require("../controllers/service.contoller").findServiceById);
router.post("/",[createSchemaValidation(serviceAddSchema,[]),processAuthentication] ,require("../controllers/service.contoller").createService);
router.put("/:id",[createSchemaValidation(serviceUpdateSchema,id),processAuthentication], require("../controllers/service.contoller").updateService);
router.delete("/:id",[createSchemaValidation([],id),processAuthentication], require("../controllers/service.contoller").deleteService);
module.exports = router;