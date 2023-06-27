const {body} = require("express-validator");

const serviceAddSchema = [
    body('name').exists().isLength({ min: 1, max: 45 }).withMessage('name 는 1~45 자 이여야 합니다.'),
    body('index').optional({ checkFalsy: true }).isLength({ max: 256 }).withMessage('index는 최대 256자 입니다.'),
    body('domain').exists().isLength({ min: 1, max: 200 }).withMessage('domain 는 최대 200자 입니다.')
]

const serviceUpdateSchema = [
    body('name').exists().isLength({ min: 1, max: 45 }).withMessage('name 는 1~45 자 이여야 합니다.'),
    body('index').optional({ checkFalsy: true }).isLength({ max: 256 }).withMessage('index는 최대 256자 입니다.'),
    body('domain').exists().isLength({ min: 1, max: 200 }).withMessage('domain 는 최대 200자 입니다.')
]


module.exports = {
    serviceAddSchema,
    serviceUpdateSchema
}