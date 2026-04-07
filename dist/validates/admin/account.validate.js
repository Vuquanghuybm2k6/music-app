"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = exports.createPost = void 0;
const system_1 = require("../../config/system");
const createPost = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash("error", "Vui lòng nhập họ tên");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/accounts/create`);
        return;
    }
    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/accounts/create`);
        return;
    }
    if (!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/accounts/create`);
        return;
    }
    next();
};
exports.createPost = createPost;
const editPatch = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash("error", "Vui lòng nhập họ tên");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/accounts/edit`);
        return;
    }
    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/accounts/edit`);
        return;
    }
    next();
};
exports.editPatch = editPatch;
