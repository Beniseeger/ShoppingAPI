/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    quantity integer DEFAULT 1,
    userId bigint REFERENCES users(id) ON DELETE CASCADE
);