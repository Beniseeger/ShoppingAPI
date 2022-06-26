# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: 'products' [GET]
- Show: 'products/:id' [GET]
- Create [token required]: 'products/create' [POST]

#### Users

- Index [token required]: 'users' [GET]
- Show [token required]: 'users/:id' [GET]
- Create N[token required]: 'users/create' [POST]
- Authenticate: 'users/authenticate' [POST]

#### Orders

- Index [token required]: 'orders' [GET]
- Current Order by user (args: user id)[token required]: 'orders/:user_id' [GET]
- Add new order [token required]: 'orders/create' [POST]

#### Order_Products

- Index [token required] [GET]
- Add Product to order [token required]: 'orderproduct/:id/product/:id' [POST]

## Data Shapes

#### Product

- id
- name
- price

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database relations

### Products

Table products(id: integer, name: varchar, price: integer)

### Users

Table users(id: integer, fristName: varchar, lastName: varchar, password: varchar (hashed))

### Orders

Table orders(id: integer, user_id: integer [foreign key to users table], quantity: integer, status: string)

### Order_Products (Created due to the many to many relation)

Table order_products(id: integer [primary key], order_id: integer [foreign key to orders table], product_id: integer [foreign key to products table])
