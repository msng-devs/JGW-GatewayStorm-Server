const { Schema, check, param, body} = require('express-validator')


const apiRouteAddSchema = [

    body('path').exists().isLength({ min: 1, max: 45 }).withMessage('path 는 1~45 자 이여야 합니다.'),
    body('method').exists().isInt().withMessage('method 는 양수여야 합니다.'),
    body('role_id').optional({ checkFalsy: true }).isInt().withMessage('role id 는 양수여야 합니다.'),
    body('option_id').exists().isInt().withMessage('option 는 양수여야 합니다.'),

]

const apiRouteUpdateSchema = [
    body('path').exists().isLength({ min: 1, max: 45 }).withMessage('path 는 1~45 자 이여야 합니다.'),
    body('method').exists().isInt().withMessage('method 는 양수여야 합니다.'),
    body('role_id').optional({ checkFalsy: true }).isInt().withMessage('role id 는 양수여야 합니다.'),
    body('option_id').exists().isInt().withMessage('option 는 양수여야 합니다.'),
]

module.exports = {
    apiRouteAddSchema,
    apiRouteUpdateSchema,
}