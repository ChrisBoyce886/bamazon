DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
    itemID int(11) NOT NULL AUTO_INCREMENT,
    departmentName varchar(75) NOT NULL,
    productName varchar(75) NOT NULL,
    price decimal(8,4) DEFAULT NULL,
    stockQuantity int(10) NOT NULL,
  PRIMARY KEY (itemID)
);

INSERT INTO products (departmentName, productName, price, stockQuantity)
VALUES  ("Heatlh & Wellness", "Yoga Mat", 10.95, 900),
        ("Health & Wellness", "Muscle Roller", 12.99, 250),
        ("Pets", "Grooming Brush", 10.00, 800),
        ("Pets", "Nail Clippers", 12.99, 400),
        ("Cooking", "Grill Mat", 19.95, 300),
        ("Cooking", "Vegitable Spiralizer", 28.99, 250),
        ("Clothing", "Compression Socks", 13.99, 150),
        ("Clothing", "Compression Knee Sleeves", 15.00, 150),
        ("Kitchenware" , "Tupperware", 18.99, 300),
        ("Kitchenware", "Stainless Steel Straw", 8.99, 500);

SELECT * FROM products;