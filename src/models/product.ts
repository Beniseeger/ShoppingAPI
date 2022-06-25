import Client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
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
      const sql = "SELECT * from products WHERE id = ($1);";

      const product = await conn.query(sql, [id]);

      conn.release();
      return product.rows as unknown as Product;
    } catch (err) {
      throw new Error(`Could not get product from id: ${id}. Error: ${err}`);
    }
  }

  async createNewProduct(product: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO products(name, price) VALUES (($1), ($2)) RETURNING *;";

      const result = await conn.query(sql, [product.name, product.price]);

      conn.release();
      return result.rows as unknown as Product;
    } catch (err) {
      throw new Error(`Could not create Product. Error: ${err}`);
    }
  }
}
