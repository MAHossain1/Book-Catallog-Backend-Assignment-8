import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const userSignUp = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully',
    data: result,
  });
});
const userSignIn = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.userSignIn(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user signed in successfully',
    data: result,
  });
});

export const AuthController = {
  userSignUp,
  userSignIn,
};
