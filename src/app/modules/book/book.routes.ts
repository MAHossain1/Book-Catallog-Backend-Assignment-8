import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookController } from './book.controller';
const router = express.Router();

router.get('/', BookController.getBooksFromDB);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.getSingleBook);

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.createBook
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.updateBookDataToDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteBookFromDB
);

export const BookRoutes = router;
