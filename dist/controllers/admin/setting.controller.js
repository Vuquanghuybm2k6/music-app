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
exports.generalPost = exports.general = void 0;
const settings_general_model_1 = __importDefault(require("../../models/settings-general.model"));
const system_1 = require("../../config/system");
const general = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const settingGeneral = yield settings_general_model_1.default.findOne();
    res.render("admin/pages/settings/general", {
        pageTitle: "Setting",
        settingGeneral
    });
});
exports.general = general;
const generalPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let logo = "";
        const dataSettingGeneral = {
            websiteName: req.body.websiteName,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            copyright: req.body.copyright,
            logo: logo
        };
        if (req.body.logo) {
            dataSettingGeneral["logo"] = req.body.logo[0];
        }
        const settingGeneral = yield settings_general_model_1.default.findOne();
        if (!settingGeneral) {
            const newSettingGeneral = new settings_general_model_1.default(dataSettingGeneral);
            yield newSettingGeneral.save();
        }
        else {
            yield settings_general_model_1.default.updateOne({ _id: settingGeneral.id }, dataSettingGeneral);
        }
        res.redirect(`${system_1.systemConfig.prefixAdmin}/settings/general`);
        console.log("Cập nhật thành công");
    }
    catch (error) {
        console.log("Cập nhật thất bại");
        res.redirect(`${system_1.systemConfig.prefixAdmin}/settings/general`);
    }
});
exports.generalPost = generalPost;
