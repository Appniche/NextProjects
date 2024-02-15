INSERT INTO categories (CategoryName) VALUES 
('Electronics'),
('Automobile'),
('House Decor'),
('House Appliances');


-- Electronics
INSERT INTO products (CategoryID, SubCategoryName, Title, Description, Price, Company, Ratings, Image) VALUES 
(1, 'Smartphones', 'Samsung Galaxy S21', 'Flagship smartphone with advanced features', '999.99', 'Samsung', '4.5', '<insert_image_blob_here>'),
(1, 'Laptops', 'Apple MacBook Pro', 'Powerful laptop for professional use', '1499.99', 'Apple', '4.8', '<insert_image_blob_here>');

-- Automobile
INSERT INTO products (CategoryID, SubCategoryName, Title, Description, Price, Company, Ratings, Image) VALUES 
(2, 'Cars', 'Toyota Camry', 'Mid-size sedan with excellent fuel efficiency and reliability', '24999.99', 'Toyota', '4.7', '<insert_image_blob_here>'),
(2, 'Cars', 'Honda Civic', 'Compact car known for its sporty design and agile handling', '21999.99', 'Honda', '4.6', '<insert_image_blob_here>');

-- House Decor
INSERT INTO products (CategoryID, SubCategoryName, Title, Description, Price, Company, Ratings, Image) VALUES 
(3, 'Wall Art', 'Canvas Wall Art', 'Modern abstract canvas print for home decor', '99.99', 'Decor Corp', '4.7', '<insert_image_blob_here>'),
(3, 'Decorative Pillows', 'Embroidered Throw Pillow', 'Soft and stylish throw pillow for living room', '29.99', 'Home Decor Inc.', '4.9', '<insert_image_blob_here>');


-- Home Appliances
INSERT INTO products (CategoryID, SubCategoryName, Title, Description, Price, Company, Ratings, Image) VALUES 
(4, 'Refrigerators', 'LG French Door Refrigerator', 'Energy-efficient refrigerator with ample storage', '1799.99', 'LG', '4.6', '<insert_image_blob_here>'),
(4, 'Washing Machines', 'Samsung Front Load Washer', 'High-capacity washing machine with multiple cycles', '899.99', 'Samsung', '4.4', '<insert_image_blob_here>');
