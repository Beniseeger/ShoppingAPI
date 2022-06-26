import Client from '../database';

export type Order = {
  id?: number;
  quantity: number;
  status: string;
  userid: number;
};

export class OrderStore {
  async getCurrentOrderByUserId(userId: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders WHERE userid = ($1);`;

      const result = await conn.query(sql, [userId]);

      conn.release();

      return result.rows[0] as unknown as Order;
    } catch (err) {
      throw new Error(`Could not get specific order ${userId}. Error: ${err}`);
    }
  }

  async orderIndexRoute(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders;`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows as unknown as Order[];
    } catch (err) {
      throw new Error(`Could not get all orders. Error: ${err}`);
    }
  }

  async createNewOrder(userId: number, status: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = `INSERT INTO orders(userid, status) VALUES(($1), ($2)) RETURNING *;`;

      const result = await conn.query(sql, [userId, status]);

      conn.release();
      console.log(result);

      return result.rows[0] as unknown as Order;
    } catch (err) {
      throw new Error(`Could not create new order. Error: ${err}`);
    }
  }
}
