import bcrypt from 'bcrypt';

const createdHash = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePassword = async (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(givenPassword, savedPassword);
};

export const HashedPassword = {
  createdHash,
  comparePassword,
};
