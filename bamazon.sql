DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT(10) NULL,
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
    department_name VARCHAR(50) NULL,
    over_head_costs DECIMAL(10,2) NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO departments
    (department_name, over_head_costs)
VALUES
    ('Toys and Games', 2000),
    ('Electronics', 8000),
    ('Camera and Photo', 5000),
    ('Video Games', 4000),
    ('Books', 1000),
    ('Clothing', 6000);