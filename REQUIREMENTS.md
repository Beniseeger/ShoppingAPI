# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: 'products'
- Show: 'products/:id' [GET]
- Create [token required]: 'products' [POST]
- [OPTIONAL] Top 5 most popular products: 'five-most-expensive-products' [GET]
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]: 'users' [GET]
- Show [token required]: 'users/:id' [GET]
- Create N[token required]: 'users' [POST]

#### Orders

- Current Order by user (args: user id)[token required]: 'users/:id/order' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order ???? In DB schreiben?
- user_id
- status of order (active or complete)

## Database relations

Table products(id: integer, name: varchar, price: integer)
Table users(id: integer, fristName: varchar, lastName: varchar, password: string (hashed))
Table orders(id: integer, user_id: integer [foreign key to users table], status: string)
Table order_products(id:integer [primary key], quantity: integer, order_id: integer [foreign key to orders table], product_id: integer [foreign key to products table])
