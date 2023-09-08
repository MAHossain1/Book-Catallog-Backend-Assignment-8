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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const hashedPassword_1 = require("../../../utlis/hashedPassword");
const user_service_1 = require("../user/user.service");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (isUserExist) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'User Already exist');
    }
    payload.password = yield hashedPassword_1.HashedPassword.createdHash(payload.password);
    const newUser = yield prisma_1.default.user.create({
        data: payload,
    });
    const token = yield jwtHelpers_1.jwtHelpers.createToken(newUser);
    newUser.password = '';
    return { user: newUser, token };
});
const userSignIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExists = yield prisma_1.default.user.findFirst({
        where: {
            email,
        },
    });
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'User does not exists');
    }
    const isPasswordMatched = yield hashedPassword_1.HashedPassword.comparePassword(password, isUserExists.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'password does not match');
    }
    const token = yield jwtHelpers_1.jwtHelpers.createToken(isUserExists);
    isUserExists.password = '';
    return { user: isUserExists, token };
});
const getUserProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.getUserById(id);
    return result;
});
exports.AuthService = {
    createUser,
    userSignIn,
    getUserProfile,
};
