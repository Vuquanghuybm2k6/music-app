"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const favorite_song_route_1 = require("./favorite-song.route");
const search_route_1 = require("./search.route");
const page_route_1 = require("./page.route");
const user_route_1 = require("./user.route");
const clientRoutes = (app) => {
    app.use("/topics", topic_route_1.topicRoutes);
    app.use("/songs", song_route_1.songRoutes);
    app.use("/favorite-songs", favorite_song_route_1.favoriteSongRoutes);
    app.use("/search", search_route_1.searchRoutes);
    app.use("/", page_route_1.homeRoutes);
    app.use("/user", user_route_1.userRoutes);
};
exports.default = clientRoutes;
