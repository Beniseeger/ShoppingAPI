import Client from '../database';

export type Order_Products = {
  id?: number;
  quantity: number;
  order_id: number;
  product_id: number;
};

export class OrderStore {
  async getCurrentOrderByUserId(userId: string): Promise<Order_Products> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders WHERE user_id = ($1);`;

      const result = await conn.query(sql, [userId]);

      conn.release();

      return result.rows as unknown as Order_Products;
    } catch (err) {
      throw new Error(`Could not get books. Error: ${err}`);
    }
  }
}
