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
exports.permissionsPatch = exports.permissions = exports.editPatch = exports.edit = exports.deleteRole = exports.createPost = exports.create = exports.index = void 0;
const role_model_1 = __importDefault(require("../../models/role.model"));
const pagination_1 = __importDefault(require("../../helpers/pagination"));
const search_1 = __importDefault(require("../../helpers/search"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
    };
    if (req.query.keyword) {
        const regex = (0, search_1.default)(req.query);
        find.title = regex;
    }
    const pagination = {
        limitItem: 4,
        currentPage: 1,
        skip: 1
    };
    const totalItems = yield role_model_1.default.countDocuments(find);
    (0, pagination_1.default)(req.query, totalItems, pagination);
    const role = yield role_model_1.default.find(find).skip(pagination.skip).limit(pagination.limitItem);
    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm quyền",
        records: role,
        pagination
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/roles/create", {
        pageTitle: "Thêm mới Nhóm quyền",
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = new role_model_1.default(req.body);
        yield role.save();
        console.log("Tao mới nhóm quyền thành công");
        res.redirect("/admin/roles");
    }
    catch (error) {
        console.error("Lỗi khi tạo mới nhóm quyền:", error);
        res.status(500).send("Đã xảy ra lỗi khi tạo mới nhóm quyền");
    }
});
exports.createPost = createPost;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const role = yield role_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    if (!role) {
        console.log("Không tìm thấy nhóm quyền");
    }
    else {
        yield role_model_1.default.updateOne({
            _id: id
        }, {
            deleted: true
        });
        console.log("Xóa nhóm quyền thành công");
        res.redirect("/admin/roles");
    }
});
exports.deleteRole = deleteRole;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const role = yield role_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    res.render("admin/pages/roles/edit", {
        pageTitle: "Chỉnh sửa nhóm quyền",
        data: role
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const role = yield role_model_1.default.findOne({
        _id: id
    });
    if (!role) {
        console.log("Không tìm thấy nhóm quyền");
    }
    else {
        yield role_model_1.default.updateOne({
            _id: id
        }, Object.assign({}, req.body));
        console.log("Cập nhật nhóm quyền thành công");
        res.redirect("/admin/roles");
    }
});
exports.editPatch = editPatch;
const permissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/roles/permissions", {
        pageTitle: "Phân quyền",
        records: roles
    });
});
exports.permissions = permissions;
const permissionsPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const permissions = JSON.parse(req.body.permissions);
        for (const item of permissions) {
            yield role_model_1.default.updateOne({
                _id: item.id
            }, {
                permissions: item.permissions
            });
        }
        console.log("Cập nhật quyền thành công");
        res.redirect("/admin/roles/permissions");
        console.log(permissions);
    }
    catch (error) {
        console.error("Lỗi khi cập nhật quyền:", error);
        res.status(500).send("Đã xảy ra lỗi khi cập nhật quyền");
    }
});
exports.permissionsPatch = permissionsPatch;
