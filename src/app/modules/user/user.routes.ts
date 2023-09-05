import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.userFromDB);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getUserById);

export const UserRoutes = router;