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
exports.changeStatus = exports.detail = exports.deleteAccount = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const role_model_1 = __importDefault(require("../../models/role.model"));
const account_model_1 = __importDefault(require("../../models/account.model"));
const md5_1 = __importDefault(require("md5"));
const system_1 = require("../../config/system");
const pagination_1 = __importDefault(require("../../helpers/pagination"));
const search_1 = __importDefault(require("../../helpers/search"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
    };
    if (req.query.keyword) {
        const regex = (0, search_1.default)(req.query);
        find.fullName = regex;
    }
    const pagination = {
        limitItem: 4,
        currentPage: 1,
        skip: 1
    };
    const totalItems = yield account_model_1.default.countDocuments(find);
    (0, pagination_1.default)(req.query, totalItems, pagination);
    const records = yield account_model_1.default
        .find(find)
        .select("-password -token")
        .lean()
        .exec();
    for (const record of records) {
        const role = yield role_model_1.default.findOne({
            _id: record.role_id,
            deleted: false
        })
            .lean()
            .exec();
        if (role) {
            record.role = role;
        }
    }
    res.render("admin/pages/accounts/index", {
        pageTitle: "Danh sách tài khoản",
        records: records,
        pagination
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo mới tài khoản",
        roles: roles
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExit = yield account_model_1.default.findOne({
        email: req.body.email,
        deleted: false
    });
    if (emailExit) {
        console.log("Email đã tồn tại");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/accounts`);
    }
    else {
        req.body.password = (0, md5_1.default)(req.body.password);
        let avatar = "";
        if (req.body.avatar) {
            avatar = req.body.avatar[0];
        }
        const dataAccount = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            role_id: req.body.role_id,
            status: req.body.status,
            avatar: avatar
        };
        const record = new account_model_1.default(dataAccount);
        yield record.save();
        res.redirect(`${system_1.systemConfig.prefixAdmin}/accounts`);
        console.log("Tạo tài khoản thành công");
    }
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const account = yield account_model_1.default.findOne({
            _id: id,
            deleted: false
        }).select("-password -token");
        const roles = yield role_model_1.default.find({
            deleted: false
        });
        res.render("admin/pages/accounts/edit", {
            pageTitle: "Chỉnh sửa tài khoản",
            account: account,
            roles: roles
        });
    }
    catch (error) {
        res.redirect(`${system_1.systemConfig.prefixAdmin}/accounts`);
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const emailExit = yield account_model_1.default.findOne({
        _id: {
            $ne: id
        },
        email: req.body.email,
        deleted: false
    });
    if (emailExit) {
        console.log("Email đã tồn tại");
    }
    else {
        if (req.body.password) {
            req.body.password = (0, md5_1.default)(req.body.password);
        }
        else {
            delete req.body.password;
        }
        let avatar = "";
        if (req.body.avatar) {
            avatar = req.body.avatar[0];
        }
        yield account_model_1.default.updateOne({
            _id: id
        }, Object.assign(Object.assign({}, req.body), { avatar: avatar }));
        console.log("Cập nhật tài khoản thành công");
    }
    res.redirect(`${system_1.systemConfig.prefixAdmin}/accounts`);
});
exports.editPatch = editPatch;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const account = yield account_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    if (!account) {
        console.log("Không tìm thấy tài khoản");
    }
    else {
        yield account_model_1.default.updateOne({
            _id: id
        }, {
            deleted: true
        });
        console.log("Xóa tài khoản thành công");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/accounts`);
    }
});
exports.deleteAccount = deleteAccount;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const account = yield account_model_1.default.findOne({
            _id: id,
            deleted: false
        }).select("-password -token");
        const role = yield role_model_1.default.findOne({
            _id: account === null || account === void 0 ? void 0 : account.role_id,
            deleted: false
        });
        res.render("admin/pages/accounts/detail", {
            pageTitle: "Chi tiết tài khoản",
            account: account,
            role: role
        });
    }
    catch (error) {
        res.redirect(`${system_1.systemConfig.prefixAdmin}/accounts`);
    }
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const status = req.params.status;
    const account = yield account_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    if (!account) {
        console.log("Không tìm thấy tài khoản");
    }
    else {
        yield account_model_1.default.updateOne({
            _id: id
        }, {
            status: status
        });
        console.log("Cập nhật trạng thái tài khoản thành công");
    }
    res.redirect("/admin/accounts");
});
exports.changeStatus = changeStatus;
