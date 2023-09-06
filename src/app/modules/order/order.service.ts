import { Order, OrderedBooks, User } from '@prisma/client';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createNewOrder = async (
  userId: string,
  orderedBooksData: OrderedBooks[]
) => {
  const result = await prisma.$transaction(async transactionClient => {
    const order = await transactionClient.order.create({
      data: {
        userId,
      },
    });

    await Promise.all(
      orderedBooksData.map(async bookData => {
        const existingBook = await transactionClient.book.findUnique({
          where: { id: bookData.bookId },
        });

        if (!existingBook) {
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            `Your ordered book ${bookData.bookId} not found`
          );
        }

        return transactionClient.orderedBooks.create({
          data: {
            orderId: order.id,
            bookId: bookData.bookId,
            quantity: bookData.quantity,
          },
        });
      })
    );

    const newOrderData = await transactionClient.order.findUnique({
      where: { id: order.id },
      include: {
        orderedBooks: true,
      },
    });
    return newOrderData;
  });
  return result;
};

const getAllOrders = async (): Promise<Partial<Order>[]> => {
  const result = await prisma.order.findMany({
    include: {
      orderedBooks: true,
    },
  });
  return result;
};

const getUserAllOrders = async (userId: string): Promise<Partial<Order>[]> => {
  const result = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      orderedBooks: true,
    },
  });
  return result;
};

const getSingleOrder = async (
  id: string,
  user: Partial<User>
): Promise<Order | null> => {
  let result: Order | null = null;

  if (user.role === ENUM_USER_ROLE.CUSTOMER) {
    result = await prisma.order.findUnique({
      where: {
        id,
        userId: user.id,
      },
      include: {
        orderedBooks: true,
      },
    });
  } else {
    result = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        orderedBooks: true,
      },
    });
  }
  return result;
};

export const OrderService = {
  createNewOrder,
  getAllOrders,
  getUserAllOrders,
  getSingleOrder,
};
