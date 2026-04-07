"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const system_1 = require("../../config/system");
const createPost = (req, res, next) => {
    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/auth/login`);
        return;
    }
    if (!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/auth/login`);
        return;
    }
    next();
};
exports.createPost = createPost;
