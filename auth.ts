import { User } from "./models/user";
import { JWTSecret } from "./config";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createHash, timingSafeEqual } = require("crypto");

export const hashPassword = async (pass: string): Promise<string> => await bcrypt.hash(pass, 10);

export const cmpPassword = async (pass: string, hash: string): Promise<boolean> =>
  await bcrypt.compare(pass, hash);

// The first returned value is the JWT, the second is the CSRF token. The third is a UNIX timestamp
// of how long the tokens are valid in seconds.
export const prepareTokens = (user: User): [string, string, number] => {
  const maxAge = 3600;
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + maxAge;
  const token = jwt.sign({ userId: user.id, jwtId: user.jwtId, iat, exp }, JWTSecret);
  const csrf = createHash("sha256").update(token).digest("hex");
  return [token, csrf, maxAge];
};

// The first returned value is whether the tokens are valid, the second is the decoded payload, and
// the last is the error message if the tokens are not valid.
export const verifyTokens = (token: string, csrf: string): [boolean, any, string] => {
  try {
    const contents = jwt.verify(token, JWTSecret);
    const newCsrf = createHash("sha256").update(token).digest("hex");
    if (csrf.length !== newCsrf.length || !timingSafeEqual(Buffer.from(csrf), Buffer.from(newCsrf)))
      return [false, {}, "invalid csrf token"];
    return [true, contents, ""];
  } catch (err) {
    return [false, {}, err.message];
  }
};
