const {ApplicationException} = require("../utlis/exception/application.exception");
const {ValidationError, ForeignKeyConstraintError, UniqueConstraintError, DatabaseError} = require("sequelize");

const exceptionHandler = (err, req, res, next) => {
    console.log(err);
    if (res.headersSent) {
        return next(err)
    }

    switch (err.constructor) {
        case ApplicationException:
            console.log(err.code)
            const response = {
                timestamp: new Date(),
                status: err.code.status,
                error: err.code.title,
                code: err.code.code,
                message: err.message,
                path: req.url
            };
            res.status(err.code.status).send(response);
            break;
        case SyntaxError:
            res.status(400).send({
                timestamp: new Date(),
                status: 400,
                error: "Bad Request",
                message: "Invalid JSON",
                code: "None",
                path: req.url
            });
            break;
        case ValidationError:
        case ForeignKeyConstraintError:
        case UniqueConstraintError:
            res.status(400).send({
                timestamp: new Date(),
                status: 400,
                error: "Bad Request",
                message: "Data 유효성에 에러가 발생했습니다.",
                code: "None",
                path: req.url
            });
            break;
        case DatabaseError:
            res.status(500).send({
                timestamp: new Date(),
                status: 500,
                error: "Internal Server Error",
                message: "Database 서버에 에러가 발생했습니다.",
                code: "None",
                path: req.url
            });
            break;
        default:
            res.status(500).send({
                timestamp: new Date(),
                status: 500,
                error: "Internal Server Error",
                message: "서버에 알 수 없는 에러가 발생했습니다.",
                code: "None",
                path: req.url
            });
    }
}


module.exports = {exceptionHandler};
