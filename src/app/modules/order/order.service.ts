import { OrderedBooks } from '@prisma/client';
import httpStatus from 'http-status';
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

export const OrderService = {
  createNewOrder,
};
