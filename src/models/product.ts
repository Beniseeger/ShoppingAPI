import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductStore {
  async productIndexRoute(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM products;`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows as Product[];
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * from products WHERE id = ($1);';

      const product = await conn.query(sql, [id]);

      conn.release();
      return product.rows[0] as unknown as Product;
    } catch (err) {
      throw new Error(`Could not get product from id: ${id}. Error: ${err}`);
    }
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO products(name, price) VALUES (($1), ($2)) RETURNING *;';

      const result = await conn.query(sql, [product.name, product.price]);

      conn.release();
      return result.rows[0] as unknown as Product;
    } catch (err) {
      throw new Error(`Could not create Product. Error: ${err}`);
    }
  }

  async deleteProduct(productId: string): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = `DELETE FROM products WHERE id=($1) RETURNING *;`;

      const result = await conn.query(sql, [productId]);

      conn.release();

      return result.rows[0] as unknown as Product;
    } catch (err) {
      throw new Error(`Could not delete product. Error: ${err}`);
    }
  }
}
