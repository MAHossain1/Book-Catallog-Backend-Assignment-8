import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { HashedPassword } from '../../../utlis/hashedPassword';

const createUser = async (payload: User) => {
  const isUserExist = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (isUserExist) {
    throw new ApiError(httpStatus.FORBIDDEN, 'User Already exist');
  }

  payload.password = await HashedPassword.createdHash(payload.password);

  const newUser = await prisma.user.create({
    data: payload,
  });

  const token = await jwtHelpers.createToken(newUser);

  newUser.password = '';

  return { user: newUser, token };
};

const userSignIn = async (payload: Partial<User>) => {
  const { email, password } = payload;
  const isUserExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!isUserExists) {
    throw new ApiError(httpStatus.FORBIDDEN, 'User does not exists');
  }

  const isPasswordMatched = await HashedPassword.comparePassword(
    password!,
    isUserExists.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.FORBIDDEN, 'password does not match');
  }

  const token = await jwtHelpers.createToken(isUserExists);

  isUserExists.password = '';

  return { user: isUserExists, token };
};
export const AuthService = {
  createUser,
  userSignIn,
};
