import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const userFromDB = async (): Promise<Partial<User>[]> => {
  const result = await prisma.user.findMany();
  return result;
};

const getUserById = async (id: string) => {
  const result = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  userFromDB,
  getUserById,
};
