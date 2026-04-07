"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = exports.edit = exports.index = void 0;
const account_model_1 = __importDefault(require("../../models/account.model"));
const system_1 = require("../../config/system");
const md5_1 = __importDefault(require("md5"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    const user = yield account_model_1.default.findOne({
        token: token,
        deleted: false,
    });
    res.render("admin/pages/my-account/index", {
        pageTitle: "Tài khoản của tôi",
        user: user
    });
});
exports.index = index;
const edit = (req, res) => {
    res.render('admin/pages/my-account/edit', {
        pageTitle: "Chỉnh sửa thông tin cá nhân"
    });
};
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = res.locals.user.id;
    const emailExit = yield account_model_1.default.findOne({
        _id: {
            $ne: id
        },
        email: req.body.email,
        deleted: false
    });
    if (emailExit) {
        console.log("Email đã tồn tại");
        return res.redirect(`${system_1.systemConfig.prefixAdmin}/my-account/edit`);
    }
    else {
        if (req.body.password) {
            req.body.password = (0, md5_1.default)(req.body.password);
        }
        else {
            delete req.body.password;
        }
    }
    console.log(req.body);
    let avatar = "";
    const dataUpdate = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        avatar: avatar
    };
    if (req.body.avatar) {
        dataUpdate["avatar"] = req.body.avatar[0];
    }
    yield account_model_1.default.updateOne({
        _id: id
    }, dataUpdate);
    console.log("Cập nhật tài khoản thành công");
    res.redirect(`${system_1.systemConfig.prefixAdmin}/my-account/edit`);
});
exports.editPatch = editPatch;
