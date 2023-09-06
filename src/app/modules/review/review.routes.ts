import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ReviewController } from './review.controller';

const router = express.Router();

router.post(
  '/create-review',
  auth(ENUM_USER_ROLE.CUSTOMER),
  ReviewController.createReview
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.CUSTOMER),
  ReviewController.getReviewsFromDB
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.CUSTOMER),
  ReviewController.getSingleReview
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
  ReviewController.updateReviewDataToDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
  ReviewController.deleteReviewFromDB
);

export const reviewRoutes = router;
