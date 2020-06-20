import { hashPassword } from "../auth";
import { get, run, beginTransaction, commitTransaction } from "../db";

export class User {
  constructor(
    public id: number,
    public username: string,
    public passwordHash: string,
    public validSessionId: number
  ) {}

  static async getById(db, id: number): Promise<User | null> {
    const fields = await get(db)("SELECT * FROM user WHERE id = ?;", id);
    if (!fields) return null;
    return new User(fields.id, fields.username, fields.password, fields.validSessionId);
  }

  static async getByUsername(db, username: string): Promise<User | null> {
    const fields = await get(db)("SELECT * FROM user WHERE username = ?;", username);
    if (!fields) return null;
    return new User(fields.id, fields.username, fields.passwordHash, fields.validSessionId);
  }

  async changePassword(db, password: string): Promise<void> {
    await beginTransaction(db);
    await run(db)(
      "UPDATE user SET validSessionId = validSessionId + 1, passwordHash = ? WHERE id = ?;",
      await hashPassword(password),
      this.id
    );
    await commitTransaction(db);
  }
}
