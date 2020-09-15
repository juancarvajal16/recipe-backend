"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
exports.isAuth = ({ context }, next) => {
    const authorization = context.req.headers['authorization'];
    if (!authorization) {
        throw new Error('Access denied, please login to continue');
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = jsonwebtoken_1.verify(token, process.env.JWT_SECRET_KEY);
        context.payload = payload;
    }
    catch (err) {
        console.log(err);
        throw new Error('Access denied, please login to continue');
    }
    return next();
};
