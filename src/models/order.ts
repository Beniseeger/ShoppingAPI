import Client from '../database';

export type Order = {
  id?: number;
  quantity: number;
  status: string;
  user_id: number;
};

export class OrderStore {
  async getCurrentOrderByUserId(userId: string): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders WHERE user_id = ($1);`;

      const result = await conn.query(sql, [userId]);

      conn.release();

      return result.rows as unknown as Order;
    } catch (err) {
      throw new Error(`Could not get books. Error: ${err}`);
    }
  }

  async orderIndexRoute() {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders;`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows as unknown as Order;
    } catch (err) {
      throw new Error(`Could not get books. Error: ${err}`);
    }
  }
}
