import { hashPassword } from "../auth";
import { get, run } from "../db";

export class User {
  constructor(
    public id: number,
    public username: string,
    public passwordHash: string,
    public jwtId: number
  ) {}

  static async getById(db, id: number): Promise<User | null> {
    const fields = await get(db)("SELECT * FROM user WHERE id = ?;", id);
    if (!fields) return null;
    return new User(fields.id, fields.username, fields.password, fields.jwtId);
  }

  static async getByUsername(db, username: string): Promise<User | null> {
    const fields = await get(db)("SELECT * FROM user WHERE username = ?;", username);
    if (!fields) return null;
    return new User(fields.id, fields.username, fields.passwordHash, fields.jwtId);
  }

  async changePassword(db, password: string): Promise<void> {
    await run(db)("BEGIN TRANSACTION;");
    await run(db)(
      "UPDATE user SET jwtId = jwtId + 1, passwordHash = ? WHERE id = ?;",
      await hashPassword(password),
      this.id
    );
    await run(db)("COMMIT TRANSACTION;");
  }
}
