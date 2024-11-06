import * as bcrypt from 'bcrypt';

export const generateHashedPassword = async (password: string) => {
  console.log(password);
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password + salt, 12);
  return {
    salt,
    hashedPassword,
  };
};
