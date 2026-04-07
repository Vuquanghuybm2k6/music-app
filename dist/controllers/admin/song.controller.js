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
exports.changeMulti = exports.changeStatus = exports.detail = exports.deleteSong = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const system_1 = require("../../config/system");
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
    const totalItems = yield song_model_1.default.countDocuments(find);
    (0, pagination_1.default)(req.query, totalItems, pagination);
    const songs = yield song_model_1.default.find(find).skip(pagination.skip).limit(pagination.limitItem);
    res.render("admin/pages/songs/index", {
        pageTitle: "Danh sách bài hát",
        songs,
        pagination
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("fullName");
    res.render("admin/pages/songs/create", {
        pageTitle: "Thêm mới bài hát",
        topics,
        singers
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    let audio = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        audio = req.body.audio[0];
    }
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar: avatar,
        audio: audio,
        lyrics: req.body.lyrics
    };
    const song = new song_model_1.default(dataSong);
    yield song.save();
    res.redirect(`${system_1.systemConfig.prefixAdmin}/songs`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const song = yield song_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    const topics = yield topic_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("fullName");
    res.render("admin/pages/songs/edit", {
        pageTitle: "Chỉnh sửa mới bài hát",
        song,
        topics,
        singers
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics: req.body.lyrics
    };
    if (req.body.avatar) {
        dataSong["avatar"] = req.body.avatar[0];
    }
    if (req.body.audio) {
        dataSong["audio"] = req.body.audio[0];
    }
    yield song_model_1.default.updateOne({
        _id: id
    }, dataSong);
    res.redirect(`${system_1.systemConfig.prefixAdmin}/songs`);
});
exports.editPatch = editPatch;
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const song = yield song_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    if (!song) {
        console.log("Bài hát không tồn tại");
    }
    else {
        yield song_model_1.default.updateOne({
            _id: id
        }, {
            deleted: true
        });
    }
    res.redirect(`${system_1.systemConfig.prefixAdmin}/songs`);
});
exports.deleteSong = deleteSong;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const song = yield song_model_1.default.findOne({
        _id: id,
        status: "active",
        deleted: false
    });
    const topic = yield topic_model_1.default.findOne({
        _id: song.topicId,
        status: "active",
        deleted: false
    });
    const infoSinger = yield singer_model_1.default.findOne({
        _id: song.singerId,
        status: "active",
        deleted: false
    });
    song["infoSinger"] = infoSinger || { fullName: "Không rõ" };
    song["topic"] = topic;
    res.render("admin/pages/songs/detail", {
        pageTitle: "Chi tiết bài hát",
        song
    });
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const status = req.params.status;
    const song = yield song_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    if (!song) {
        console.log("Bài hát không tồn tại");
    }
    else {
        yield song_model_1.default.updateOne({
            _id: id
        }, {
            status: status
        });
    }
    res.redirect(`${system_1.systemConfig.prefixAdmin}/songs`);
});
exports.changeStatus = changeStatus;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body.ids.split(", ");
    const type = req.body.type;
    switch (type) {
        case "active":
            yield song_model_1.default.updateMany({
                _id: { $in: ids }
            }, {
                $set: { status: "active" }
            });
            break;
        case "inactive":
            yield song_model_1.default.updateMany({
                _id: { $in: ids }
            }, {
                $set: { status: "inactive" }
            });
            break;
        case "delete-all":
            yield song_model_1.default.updateMany({
                _id: { $in: ids }
            }, {
                $set: { deleted: true }
            });
            break;
        default:
            break;
    }
    console.log("Thay đổi thành công");
    res.redirect(`${system_1.systemConfig.prefixAdmin}/songs`);
});
exports.changeMulti = changeMulti;
