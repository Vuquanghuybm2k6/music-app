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
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findOne({
        slug: req.params.slugTopic,
        status: "active",
        deleted: false
    });
    if (!topic) {
        res.status(404).send("Topic not found");
        return;
    }
    console.log(topic.id);
    const songs = yield song_model_1.default.find({
        topicId: topic.id,
        status: "active",
        deleted: false
    }).select("avatar title slug singerId like");
    console.log(songs);
    for (const song of songs) {
        const infoSinger = yield singer_model_1.default.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        });
        song["infoSinger"] = infoSinger || { fullName: "Không rõ" };
    }
    console.log(songs);
    res.render("client/pages/songs/list.pug", {
        pageTitle: topic.title,
        songs
    });
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    const song = yield song_model_1.default.findOne({
        slug: slugSong,
        status: "active",
        deleted: false
    });
    if (!song) {
        res.status(404).send("Song not found");
        return;
    }
    const singer = yield singer_model_1.default.findOne({
        _id: song.singerId,
        deleted: false
    }).select("fullName");
    const topic = yield topic_model_1.default.findOne({
        _id: song.topicId,
        deleted: false
    }).select("title");
    const favoriteSong = yield favorite_song_model_1.default.findOne({
        userId: res.locals.user._id,
        songId: song.id
    });
    song["isFavoriteSong"] = favoriteSong ? true : false;
    res.render("client/pages/songs/detail.pug", {
        pageTitle: "Chi tiết bài hát",
        song,
        singer,
        topic
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        status: "active",
        deleted: false
    });
    if (!song) {
        res.status(404).json({ code: 404, message: "Song not found" });
        return;
    }
    const newLike = typeLike == "like" ? song.like + 1 : song.like - 1;
    yield song_model_1.default.updateOne({
        _id: idSong,
    }, {
        like: typeLike == "like" ? song.like + 1 : song.like - 1
    });
    res.json({
        code: 200,
        message: "Cập nhật lượt like thành công",
        like: newLike
    });
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeFavorite = req.params.typeFavorite;
    switch (typeFavorite) {
        case "favorite":
            const existFavoriteSong = yield favorite_song_model_1.default.findOne({
                userId: res.locals.user.id,
                songId: idSong
            });
            if (!existFavoriteSong) {
                const record = new favorite_song_model_1.default({
                    userId: res.locals.user.id,
                    songId: idSong
                });
                yield record.save();
            }
            break;
        case "unfavorite":
            yield favorite_song_model_1.default.deleteOne({
                userId: res.locals.user.id,
                songId: idSong
            });
            break;
        default:
            break;
    }
    res.json({
        code: 200,
        message: "Cập nhật yêu thích thành công",
    });
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        status: "active",
        deleted: false
    });
    if (!song) {
        res.status(404).json({ code: 404, message: "Song not found" });
        return;
    }
    const listen = song.listen + 1;
    yield song_model_1.default.updateOne({
        _id: idSong,
    }, {
        listen: listen
    });
    const songNew = yield song_model_1.default.findOne({
        _id: idSong
    });
    if (!songNew) {
        res.status(404).json({ code: 404, message: "Song not found after update" });
        return;
    }
    res.json({
        code: 200,
        message: "Cập nhật lượt nghe thành công",
        listen: songNew.listen
    });
});
exports.listen = listen;
