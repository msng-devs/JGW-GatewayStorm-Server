const {admin} = require("../../config/firebase.config");
const Member = require('../models/member.model');
const {ApplicationException,ApplicationErrorCode} = require("../utlis/exception/application.exception");
const env = process.env.NODE_ENV || 'local';

const processAuthentication = async (req, res, next) => {

    if(env === 'test') return next();

    const idToken = extractBearerToken(req.headers.authorization)

    if(idToken === null || idToken === undefined){
        throw new ApplicationException(ApplicationErrorCode.AUTH_FAILED, "인증에 실패했습니다. 토큰이 존재하지 않습니다.");
    }

    console.log(idToken)
    const decodedToken = await verifyToken(idToken)
    await checkMemberInfo(decodedToken);

    next();
};

const checkMemberInfo = async (decodedToken) => {
    const member = await Member.findByPk(decodedToken.uid)
    if(!member) throw new ApplicationException(ApplicationErrorCode.AUTH_FAILED, "인증에 실패했습니다. 회원정보가 존재하지 않습니다.");
    if(member.role < 5) throw new ApplicationException(ApplicationErrorCode.AUTH_FAILED, "인증에 실패했습니다. 권한이 없습니다.");
}
const verifyToken = async (idToken) => {
    let decodedToken = null;
    try{
        decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (e) {
        throw new ApplicationException(ApplicationErrorCode.AUTH_FAILED, "인증에 실패했습니다. 올바르지 않은 토큰입니다.");
    }

    if (decodedToken) {
        return decodedToken;
    } else {
        throw new ApplicationException(ApplicationErrorCode.AUTH_FAILED, "인증에 실패했습니다. 올바르지 않은 토큰입니다.");
    }
};

const extractBearerToken = (authHeader) => {

    let token = null

    if (authHeader) {
        token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    }

    if(token === undefined) token = null;

    return token;
}

module.exports = {
    processAuthentication
}