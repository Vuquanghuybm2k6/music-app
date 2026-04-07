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
exports.changeMulti = exports.changeStatus = exports.editPatch = exports.edit = exports.detail = exports.createPost = exports.create = exports.deleteSinger = exports.index = void 0;
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const pagination_1 = __importDefault(require("../../helpers/pagination"));
const search_1 = __importDefault(require("../../helpers/search"));
const system_1 = require("../../config/system");
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
    const totalItems = yield singer_model_1.default.countDocuments(find);
    (0, pagination_1.default)(req.query, totalItems, pagination);
    const singers = yield singer_model_1.default.find(find).skip(pagination.skip).limit(pagination.limitItem);
    res.render("admin/pages/singers/index", {
        pageTitle: "Danh sách ca sĩ",
        singers,
        pagination
    });
});
exports.index = index;
const deleteSinger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const singer = yield singer_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    if (!singer) {
        console.log("Không tìm thấy ca sĩ");
    }
    else {
        yield singer_model_1.default.updateOne({
            _id: id
        }, {
            deleted: true
        });
        console.log("Xóa ca sĩ thành công");
    }
    res.redirect(`${system_1.systemConfig.prefixAdmin}/singers`);
});
exports.deleteSinger = deleteSinger;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/singers/create", {
        pageTitle: "Tạo mới ca sĩ"
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singer = new singer_model_1.default(req.body);
    yield singer.save();
    console.log("Tạo ca sĩ thành công");
    return res.redirect(`${system_1.systemConfig.prefixAdmin}/singers`);
});
exports.createPost = createPost;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const singer = yield singer_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    res.render("admin/pages/singers/detail", {
        pageTitle: "Chi tiết ca sĩ",
        singer
    });
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const singer = yield singer_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    res.render("admin/pages/singers/edit", {
        pageTitle: "Chỉnh sửa ca sĩ",
        singer
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const singer = yield singer_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    if (!singer) {
        console.log("Không tìm thấy ca sĩ");
    }
    else {
        yield singer_model_1.default.updateOne({
            _id: id
        }, req.body);
        console.log("Cập nhật ca sĩ thành công");
    }
    res.redirect(`${system_1.systemConfig.prefixAdmin}/singers`);
});
exports.editPatch = editPatch;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const status = req.params.status;
    const singer = yield singer_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    if (!singer) {
        console.log("Không tìm thấy ca sĩ");
    }
    else {
        yield singer_model_1.default.updateOne({
            _id: id
        }, {
            status: status
        });
        console.log("Cập nhật trạng thái ca sĩ thành công");
    }
    res.redirect(`${system_1.systemConfig.prefixAdmin}/singers`);
});
exports.changeStatus = changeStatus;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body.ids.split(", ");
    const type = req.body.type;
    switch (type) {
        case "active":
            yield singer_model_1.default.updateMany({
                _id: { $in: ids }
            }, {
                $set: { status: "active" }
            });
            break;
        case "inactive":
            yield singer_model_1.default.updateMany({
                _id: { $in: ids }
            }, {
                $set: { status: "inactive" }
            });
            break;
        case "delete-all":
            yield singer_model_1.default.updateMany({
                _id: { $in: ids }
            }, {
                $set: { deleted: true }
            });
            break;
        default:
            break;
    }
    console.log("Thay đổi thành công");
    res.redirect(`${system_1.systemConfig.prefixAdmin}/singers`);
});
exports.changeMulti = changeMulti;
