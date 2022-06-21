/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    password VARCHAR(255)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price integer NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);