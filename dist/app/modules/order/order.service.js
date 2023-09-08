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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createNewOrder = (userId, orderedBooksData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield transactionClient.order.create({
            data: {
                userId,
            },
        });
        yield Promise.all(orderedBooksData.map((bookData) => __awaiter(void 0, void 0, void 0, function* () {
            const existingBook = yield transactionClient.book.findUnique({
                where: { id: bookData.bookId },
            });
            if (!existingBook) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Your ordered book ${bookData.bookId} not found`);
            }
            return transactionClient.orderedBooks.create({
                data: {
                    orderId: order.id,
                    bookId: bookData.bookId,
                    quantity: bookData.quantity,
                },
            });
        })));
        const newOrderData = yield transactionClient.order.findUnique({
            where: { id: order.id },
            include: {
                orderedBooks: true,
            },
        });
        return newOrderData;
    }));
    return result;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
const getUserAllOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({
        where: {
            userId,
        },
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
const getSingleOrder = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (user.role === user_1.ENUM_USER_ROLE.CUSTOMER) {
        result = yield prisma_1.default.order.findUnique({
            where: {
                id,
                userId: user.id,
            },
            include: {
                orderedBooks: true,
            },
        });
    }
    else {
        result = yield prisma_1.default.order.findUnique({
            where: {
                id,
            },
            include: {
                orderedBooks: true,
            },
        });
    }
    return result;
});
exports.OrderService = {
    createNewOrder,
    getAllOrders,
    getUserAllOrders,
    getSingleOrder,
};
