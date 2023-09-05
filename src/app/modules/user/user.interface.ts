import { UserRole } from '@prisma/client';

export type IUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  contactNo: string;
  address: string;
  profileImg: string;
  createdAt?: Date;
  updatedAt?: Date;
};
