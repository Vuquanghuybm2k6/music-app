"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = exports.createPost = void 0;
const system_1 = require("../../config/system");
const createPost = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash("error", "Vui lòng nhập teen ca sĩ");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/singers/create`);
        return;
    }
    next();
};
exports.createPost = createPost;
const editPatch = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash("error", "Vui lòng nhập teen ca sĩ");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/singers/edit`);
        return;
    }
    next();
};
exports.editPatch = editPatch;
