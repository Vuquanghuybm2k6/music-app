"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = exports.createPost = void 0;
const system_1 = require("../../config/system");
const createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Vui lòng nhập tiêu đề");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/songs/create`);
        return;
    }
    if (!req.body.topicId) {
        req.flash("error", "Vui lòng nhập chủ đề bài hát");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/songs/create`);
        return;
    }
    if (!req.body.singerId) {
        req.flash("error", "Vui lòng nhập tên ca sĩ");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/songs/create`);
        return;
    }
    next();
};
exports.createPost = createPost;
const editPatch = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Vui lòng nhập tiêu đề");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/songs/edit/${req.params.id}`);
        return;
    }
    if (!req.body.topicId) {
        req.flash("error", "Vui lòng nhập chủ đề bài hát");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/songs/edit/${req.params.id}`);
        return;
    }
    if (!req.body.singerId) {
        req.flash("error", "Vui lòng nhập tên ca sĩ");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/songs/edit/${req.params.id}`);
        return;
    }
    next();
};
exports.editPatch = editPatch;
