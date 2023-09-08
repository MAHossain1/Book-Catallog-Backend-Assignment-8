"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post('/create-review', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), review_controller_1.ReviewController.createReview);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), review_controller_1.ReviewController.getReviewsFromDB);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), review_controller_1.ReviewController.getSingleReview);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER, user_1.ENUM_USER_ROLE.ADMIN), review_controller_1.ReviewController.updateReviewDataToDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER, user_1.ENUM_USER_ROLE.ADMIN), review_controller_1.ReviewController.deleteReviewFromDB);
exports.reviewRoutes = router;
