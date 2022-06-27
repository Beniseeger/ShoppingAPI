import Client from '../database';

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
};

export class OrderProductStore {
  async orderProductIndex(): Promise<OrderProduct[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM order_products;`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows as unknown as OrderProduct[];
    } catch (err) {
      throw new Error(`Could not get OrderProductStore. Error: ${err}`);
    }
  }

  async addProductToOrder(
    orderId: number,
    productId: number
  ): Promise<OrderProduct> {
    try {
      const conn = await Client.connect();
      const sql = `INSERT INTO order_products(order_id, product_id) VALUES(($1), ($2)) RETURNING *;`;

      const result = await conn.query(sql, [orderId, productId]);

      conn.release();
      console.log(result);
      return result.rows[0] as unknown as OrderProduct;
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get OrderProductStore. Error: ${err}`);
    }
  }

  async deleteProductFromOrder(
    orderId: string,
    productId: string
  ): Promise<OrderProduct> {
    try {
      const conn = await Client.connect();
      const sql = `DELETE FROM products WHERE order_id=($1) AND product_id=($2) RETURNING *;`;

      const result = await conn.query(sql, [orderId, productId]);

      conn.release();

      return result.rows[0] as unknown as OrderProduct;
    } catch (err) {
      throw new Error(`Could not delete product from order. Error: ${err}`);
    }
  }
}
