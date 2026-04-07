"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.resetPasswordPost = exports.resetPassword = exports.otpPasswordPost = exports.otpPassword = exports.forgotPasswordPost = exports.forgotPassword = exports.logout = exports.loginPost = exports.login = exports.registerPost = exports.register = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const md5_1 = __importDefault(require("md5"));
const forgot_password_model_1 = __importDefault(require("../../models/forgot-password.model"));
const generateHelper = __importStar(require("../../helpers/generate"));
const sendMail_1 = require("../../helpers/sendMail");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký tài khoản",
    });
});
exports.register = register;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const emailExit = yield user_model_1.default.findOne({
        email: email
    });
    if (emailExit) {
        console.log("Email đã tồn tại");
        return res.redirect("/user/register");
    }
    req.body.password = (0, md5_1.default)(req.body.password);
    const user = new user_model_1.default(req.body);
    yield user.save();
    res.cookie("tokenUser", user.tokenUser);
    console.log("Đăng ký thành công");
    res.redirect("/");
});
exports.registerPost = registerPost;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng ký nhập",
    });
});
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = yield user_model_1.default.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        console.log("Email không tồn tại");
        res.redirect(req.get("Referer"));
    }
    else {
        if ((0, md5_1.default)(req.body.password) == user.password) {
            console.log("Đăng nhập thành công");
            res.cookie("tokenUser", user.tokenUser);
            res.redirect("/topics");
        }
        else {
            console.log("Sai mật khẩu");
            res.redirect(req.get("Referer"));
        }
    }
});
exports.loginPost = loginPost;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("tokenUser");
    res.redirect("/user/login");
});
exports.logout = logout;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/forgot-password", {
        pageTitle: "Lấy lại mật khẩu"
    });
});
exports.forgotPassword = forgotPassword;
const forgotPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({
        email: req.body.email,
        deleted: false
    });
    if (!user) {
        console.log("Email không tồn tại");
    }
    else {
        const email = req.body.email;
        yield forgot_password_model_1.default.deleteMany({ email: email });
        const otp = generateHelper.generateRandomNumber(6);
        const objectForgotPassword = {
            email: email,
            otp: otp,
            expiresAt: Date.now()
        };
        const forgotPassword = new forgot_password_model_1.default(objectForgotPassword);
        yield forgotPassword.save();
        const subject = `Mã OTP xác mình lấy lại mật khẩu`;
        const html = `Mã OTP xác mình lấy lại mật khẩu là <b>${otp}</b>. Thời hạn sử dụng là 3 phút. Lưu ý không được để lộ mã OTP`;
        (0, sendMail_1.sendMail)(email, subject, html);
        res.redirect(`/user/password/otp?email=${email}`);
    }
});
exports.forgotPasswordPost = forgotPasswordPost;
const otpPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    res.render("client/pages/user/otp-password", {
        pageTitle: "Nhập mã OTP",
        email
    });
});
exports.otpPassword = otpPassword;
const otpPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const otp = req.body.otp;
    const forgotPassword = yield forgot_password_model_1.default.findOne({
        email: email,
        otp: otp
    });
    if (!forgotPassword) {
        console.log("Mã OTP không hợp lệ");
        res.redirect(req.get("Referer"));
    }
    else {
        const user = yield user_model_1.default.findOne({
            email: email,
            deleted: false
        });
        if (!user) {
            console.log("User không tồn tại");
            return res.redirect(req.get("Referer"));
        }
        res.cookie("tokenUser", user.tokenUser);
        res.render("client/pages/user/reset-password", {
            pageTitle: "Đặt lại mật khẩu",
            email
        });
    }
});
exports.otpPasswordPost = otpPasswordPost;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/reset-password", {
        pageTitle: "Đặt lại mật khẩu",
    });
});
exports.resetPassword = resetPassword;
const resetPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const password = req.body.password;
    const tokenUser = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.tokenUser;
    if (!tokenUser) {
        console.log("Token không tìm thấy trong cookie");
        return res.redirect('/user/login');
    }
    console.log(tokenUser);
    const user = yield user_model_1.default.findOne({
        tokenUser: tokenUser,
        deleted: false
    });
    if (!user) {
        console.log("Người dùng không tồn tại");
        res.redirect(req.get("Referer"));
    }
    else {
        yield user_model_1.default.updateOne({
            tokenUser: tokenUser
        }, {
            password: (0, md5_1.default)(password)
        });
        res.redirect("/user/login");
    }
});
exports.resetPasswordPost = resetPasswordPost;
