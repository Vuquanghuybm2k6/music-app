"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const settingGeneralSchema = new mongoose.Schema({
    websiteName: String,
    logo: String,
    email: String,
    address: String,
    copyright: String,
    phone: String
}, {
    timestamps: true
});
const SettingGeneral = mongoose.model('SettingGeneral', settingGeneralSchema, 'settings-general');
exports.default = SettingGeneral;
