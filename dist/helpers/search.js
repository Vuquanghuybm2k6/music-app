"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (query) => {
    let keyword = query.keyword;
    const regex = new RegExp(keyword, "i");
    return regex;
};
