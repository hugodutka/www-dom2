import { get } from "../db";

export class User {
  constructor(
    public id: number,
    public username: string,
    public passwordHash: string
  ) {}

  static async getByUsername(db, username: string): Promise<User | null> {
    const fields = await get(db)(
      "SELECT * FROM user WHERE username = ?;",
      username
    );
    if (!fields) return null;
    return new User(fields.id, fields.username, fields.passwordHash);
  }
}
