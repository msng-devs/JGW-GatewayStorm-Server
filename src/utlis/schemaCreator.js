const {validator} = require('../middleware/validation.middleware')

const createSchemaValidation = (schema,pathSchema) => {
    const item = []

    return item.concat(schema,pathSchema,validator)
}

module.exports = {
    createSchemaValidation
}