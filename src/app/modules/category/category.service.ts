import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createCategory = async (payload: Category): Promise<Category> => {
  const result = await prisma.category.create({ data: payload });
  return result;
};

const getCategoriesFromDB = async (): Promise<Partial<Category>[]> => {
  const result = await prisma.category.findMany({ include: { books: true } });
  return result;
};

const getSingleCategory = async (
  id: string
): Promise<Partial<Category | null>> => {
  const result = await prisma.category.findFirst({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return result;
};

const updateCategoryDataToDB = async (
  id: string,
  payload: Partial<Category>
): Promise<Partial<Category | null>> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    include: {
      books: true,
    },
    data: payload,
  });
  return result;
};

const deleteCategoryFromDB = async (
  id: string
): Promise<Partial<Category | null>> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getCategoriesFromDB,
  getSingleCategory,
  updateCategoryDataToDB,
  deleteCategoryFromDB,
};
