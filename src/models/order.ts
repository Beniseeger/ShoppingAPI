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

  async createOrder(userId: number, status: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = `INSERT INTO orders(userid, status) VALUES(($1), ($2)) RETURNING *;`;

      const result = await conn.query(sql, [userId, status]);

      conn.release();

      return result.rows[0] as unknown as Order;
    } catch (err) {
      throw new Error(`Could not create new order. Error: ${err}`);
    }
  }

  async deleteOrder(orderId: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = `DELETE FROM orders WHERE id=($1) RETURNING *;`;

      const result = await conn.query(sql, [orderId]);

      conn.release();

      return result.rows[0] as unknown as Order;
    } catch (err) {
      throw new Error(`Could not delete order. Error: ${err}`);
    }
  }

  async updateOrder(
    orderId: string,
    status: string,
    quantity: number
  ): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = `UPDATE orders SET status=($1), quantity=($3) WHERE id=($2) RETURNING *`;

      const result = await conn.query(sql, [status, orderId, quantity]);

      conn.release();

      return result.rows[0] as unknown as Order;
    } catch (err) {
      throw new Error(`Could not update order. Error: ${err}`);
    }
  }
}
