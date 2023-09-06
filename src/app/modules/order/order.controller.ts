import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user: Partial<User> = req.user as Partial<User>;

  const result = await OrderService.createNewOrder(
    user.id!,
    req.body.orderedBooks
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const user: Partial<User> = req.user as Partial<User>;
  let result = [];

  if (user.role === ENUM_USER_ROLE.ADMIN) {
    result = await OrderService.getAllOrders();
  } else {
    result = await OrderService.getUserAllOrders(user.id!);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Orders Fetched successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const user: Partial<User> = req.user as Partial<User>;
  const { orderId } = req.params;

  const result = await OrderService.getSingleOrder(orderId, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Fetched successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
