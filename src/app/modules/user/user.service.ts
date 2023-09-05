import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const userFromDB = async (): Promise<Partial<User>[]> => {
  const result = await prisma.user.findMany();
  return result;
};

const getUserById = async (id: string): Promise<Partial<User | null>> => {
  const result = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  return result;
};

const updateUserDataToDB = async (
  id: string,
  payload: Partial<User>
): Promise<Partial<User | null>> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteUserFromDB = async (id: string): Promise<Partial<User | null>> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  userFromDB,
  getUserById,
  updateUserDataToDB,
  deleteUserFromDB,
};
