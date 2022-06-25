import Client from "../database";
import bcrypt from "bcrypt";

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT * FROM users;`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows as unknown as User;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async showUser(id: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT * FROM users WHERE id=($1);`;

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows as unknown as User;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async authenticateUser(
    enteredUserId: number,
    enteredPassword: string
  ): Promise<User | string> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM users WHERE id=($1)`;

      const dbUser = await conn.query(sql, [enteredUserId]);

      if (dbUser.rows.length) {
        const user = dbUser.rows[0] as User;

        if (
          bcrypt.compareSync(
            enteredPassword + process.env.PEPPER_STRING,
            user.password
          )
        ) {
          return user;
        } else {
          return "You have entered the wrong password, please enter the right password";
        }
      } else {
        return "Unknown user name, please create the user first before authenticating.";
      }

      conn.release();
    } catch (err) {
      throw new Error(`Could not authenticate user. Error: ${err}`);
    }
  }

  async createUser(user: User) {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `INSERT INTO users(firstName, lastName, password) VALUES(($1),($2),($3)) RETURNING *;`;

      const hashedPassword = bcrypt.hashSync(
        user.password + (process.env.PEPPER_STRING as string),
        parseInt(process.env.SALT_ROUNDS as string)
      );

      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        hashedPassword,
      ]);

      conn.release();

      return result.rows as unknown as User;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }
}
