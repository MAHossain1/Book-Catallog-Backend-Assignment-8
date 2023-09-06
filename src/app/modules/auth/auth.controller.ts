import { User } from '@prisma/client';
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

export const getUserProfile = catchAsync(
  async (req: Request, res: Response) => {
    const user: Partial<User> = req.user as Partial<User>;
    const result = await AuthService.getUserProfile(user.id!);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user profile retrieved Successfully',
      data: result,
    });
  }
);

export const AuthController = {
  userSignUp,
  userSignIn,
  getUserProfile,
};
