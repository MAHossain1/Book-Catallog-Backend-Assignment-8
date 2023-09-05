import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBook = async (payload: Book): Promise<Book> => {
  const result = await prisma.book.create({ data: payload });
  return result;
};

const getBooksFromDB = async (): Promise<Partial<Book>[]> => {
  const result = await prisma.book.findMany();
  return result;
};

const updateBookDataToDB = async (
  id: string,
  payload: Partial<Book>
): Promise<Partial<Book | null>> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteBookFromDB = async (id: string): Promise<Partial<Book | null>> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BookService = {
  createBook,
  getBooksFromDB,
  updateBookDataToDB,
  deleteBookFromDB,
};
