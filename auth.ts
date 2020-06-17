const bcrypt = require("bcrypt");

export const hashPassword = async (pass: string): Promise<string> => await bcrypt.hash(pass, 10);

export const cmpPassword = async (pass: string, hash: string): Promise<boolean> =>
  await bcrypt.compare(pass, hash);
