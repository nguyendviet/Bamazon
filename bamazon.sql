DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10),
    product_sales DECIMAL(10,2) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES 
    ('Harry Potter Tie', 'Toys and Games', 5.59, 536),
    ('What Do You Meme', 'Toys and Games', 29.99, 1385),
    ('Fire TV Stick', 'Electronics', 39.99, 112281),
    ('Kindle Paperwhite', 'Electronics', 89.99, 51061),
    ('Echo Dot', 'Electronics', 49.99, 56744),
    ('Mini Instant Film', 'Camera and Photo', 12.49, 4159),
    ('Super Mario', 'Video Games', 59.99, 1),
    ('Nintendo', 'Video Games', 199.99, 1),
    ('Leonardo da Vinci', 'Books', 20.99, 20),
    ('T Rex Costume', 'Clothing', 49.99, 2218);

CREATE TABLE departments (
	department_id INT(11) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (department_id)
);