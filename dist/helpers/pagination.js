"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (query, totalProduct, pagination) => {
    pagination.totalPage = Math.ceil(totalProduct / pagination.limitItem);
    if (query.page) {
        pagination.currentPage = parseInt(query.page);
    }
    pagination.skip = (pagination.currentPage - 1) * pagination.limitItem;
    return pagination;
};
