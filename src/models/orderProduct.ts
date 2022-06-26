import Client from '../database';

export type OrderProducts = {
  id?: number;
  order_id: number;
  product_id: number;
};

export class OrderProductStore {
  async orderProductIndex(): Promise<OrderProducts[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM order_products;`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows as unknown as OrderProducts[];
    } catch (err) {
      throw new Error(`Could not get books. Error: ${err}`);
    }
  }

  async addProductToOrder(
    orderId: number,
    productId: number
  ): Promise<OrderProducts> {
    try {
      const conn = await Client.connect();
      const sql = `INSERT INTO order_products(order_id, product_id) VALUES(($1), ($2)) RETURNING *;`;

      const result = await conn.query(sql, [orderId, productId]);

      conn.release();

      return result.rows[0] as unknown as OrderProducts;
    } catch (err) {
      throw new Error(`Could not get books. Error: ${err}`);
    }
  }
}
