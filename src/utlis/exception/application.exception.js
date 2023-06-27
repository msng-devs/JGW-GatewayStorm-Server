class ApplicationException extends Error {
    constructor(code,message) {
        super(message);
        this.name = "ApplicationException";
        this.code = code;
    }
}

const ApplicationErrorCode = {
    UNKNOWN_ERROR: {
        status: 500,
        code: "GS_000",
        title: "Unknown Error",
    },
    NOT_FOUND: {
        status: 404,
        code: "GS_001",
        title: "Not Found",
    },
    AUTH_FAILED:{
        status: 403,
        code: "GS_002",
        title: "Authentication Failed",
    },
    REQUEST_ARGS_ERROR:{
        status: 404,
        code: "GS_003",
        title: "Request Args Error",
    },
    ALREADY_EXIST:{
        status: 400,
        code: "GS_004",
        title: "Already Exist",
    },
}

module.exports = {
    ApplicationException,
    ApplicationErrorCode
};
