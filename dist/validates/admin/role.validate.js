"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = exports.createPost = void 0;
const system_1 = require("../../config/system");
const createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Vui lòng nhập lại tiêu đề");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/roles/create`);
        return;
    }
    next();
};
exports.createPost = createPost;
const editPatch = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Vui lòng nhập lại tiêu đề");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/roles/create`);
        return;
    }
    next();
};
exports.editPatch = editPatch;
