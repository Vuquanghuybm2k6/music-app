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
exports.changeMulti = exports.changeStatus = exports.editPatch = exports.edit = exports.detail = exports.createPost = exports.create = exports.deleteTopic = exports.index = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
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
    const totalItems = yield topic_model_1.default.countDocuments(find);
    (0, pagination_1.default)(req.query, totalItems, pagination);
    const topics = yield topic_model_1.default.find(find).skip(pagination.skip).limit(pagination.limitItem);
    res.render("admin/pages/topics/index", {
        pageTitle: "Quản lí chủ đề",
        topics,
        pagination,
        keyword: req.query.keyword,
    });
});
exports.index = index;
const deleteTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idTopic = req.params.idTopic;
    const topic = yield topic_model_1.default.findOne({
        _id: idTopic,
        deleted: false
    });
    if (!topic) {
        console.log("Không tìm thấy chủ đề");
        return res.redirect("/admin/topics");
    }
    else {
        yield topic_model_1.default.updateOne({
            _id: idTopic
        }, {
            deleted: true
        });
        console.log("Xóa chủ đề thành công");
        return res.redirect("/admin/topics");
    }
});
exports.deleteTopic = deleteTopic;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/topics/create", {
        pageTitle: "Tạo mới chủ đề",
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = new topic_model_1.default(req.body);
    yield topic.save();
    console.log("Tạo chủ đề thành công");
    return res.redirect("/admin/topics");
});
exports.createPost = createPost;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const topic = yield topic_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    res.render("admin/pages/topics/detail", {
        pageTitle: "Chi tiết chủ đề",
        topic
    });
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const topic = yield topic_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    res.render("admin/pages/topics/edit", {
        pageTitle: "Chỉnh sửa chủ đề",
        topic
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield topic_model_1.default.updateOne({
        _id: id
    }, Object.assign({}, req.body));
    console.log("Cập nhật chủ đề thành công");
    return res.redirect("/admin/topics");
});
exports.editPatch = editPatch;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const status = req.params.status;
    const topic = yield topic_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    if (!topic) {
        console.log("Không tìm thấy chủ đề");
    }
    else {
        yield topic_model_1.default.updateOne({
            _id: id
        }, {
            status: status
        });
        console.log("Cập nhật trạng thái chủ đề thành công");
    }
    res.redirect("/admin/topics");
});
exports.changeStatus = changeStatus;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body.ids.split(", ");
    const type = req.body.type;
    switch (type) {
        case "active":
            yield topic_model_1.default.updateMany({
                _id: { $in: ids }
            }, {
                $set: { status: "active" }
            });
            break;
        case "inactive":
            yield topic_model_1.default.updateMany({
                _id: { $in: ids }
            }, {
                $set: { status: "inactive" }
            });
            break;
        case "delete-all":
            yield topic_model_1.default.updateMany({
                _id: { $in: ids }
            }, {
                $set: { deleted: true }
            });
            break;
        default:
            break;
    }
    console.log("Thay đổi thành công");
    res.redirect(req.get("Referer"));
});
exports.changeMulti = changeMulti;
