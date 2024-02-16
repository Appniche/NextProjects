// <---- Required Libraries ---->
const mysql = require('mysql2');

const pool = mysql.createPool(
{
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'PICKWISE',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const products_insertion = (category, subcategory, title, description, price, company, ratings, imageBuffer) => 
{
    return new Promise((resolve, reject) => 
    {
        pool.getConnection((err, connection) => 
        {
            if (err) 
            {
                reject({'returncode': 1, 'message': err, 'output': []});
                return;
            }

            const query = 'INSERT INTO products (CategoryID, SubCategoryName, Title, Description, Price, Company, Ratings, Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';           
            connection.query(query, [category, subcategory, title, description, price, company, ratings, imageBuffer], (queryError, results) => 
            {
                connection.release();

                if (queryError) 
                {
                    reject({'returncode': 1, 'message': queryError, 'output': []});
                    return;
                }

                resolve({'returncode': 0, 'message': 'Successful', 'output': results});
            });
        });
    });
};

const product_deletion = (product_id) => 
{
    return new Promise((resolve, reject) => 
    {
        pool.getConnection((err, connection) => 
        {
            if (err) 
            {
                reject({'returncode': 1, 'message': err, 'output': []});
                return;
            }
            const query = 'DELETE FROM products WHERE ProductId = (?);';           
            connection.query(query, [product_id], (queryError, results) => 
            {
                connection.release();

                if (queryError) 
                {
                    reject({'returncode': 1, 'message': queryError, 'output': []});
                    return;
                }

                resolve({'returncode': 0, 'message': 'Successful', 'output': []});
            });
        });
    });
};

const product_fetch = (product_1, product_2) => 
{
    return new Promise((resolve, reject) => 
    {
        pool.getConnection((err, connection) => 
        {
            if (err) 
            {
                reject({'returncode': 1, 'message': err, 'output': []});
                return;
            }
            const query = 'SELECT * FROM products WHERE ProductId = (?);';           
            connection.query(query, [product_1], (queryError, results) => 
            {
                if (queryError) 
                {
                    reject({'returncode': 1, 'message': queryError, 'output': []});
                    return;
                }
                results.forEach(element => {
                    element.Image = Buffer.from(element.Image).toString('base64');
                });
                const query = 'SELECT * FROM products WHERE ProductId = (?);';           
                connection.query(query, [product_2], (queryError, results1) => 
                {
                    connection.release();
    
                    if (queryError) 
                    {
                        reject({'returncode': 1, 'message': queryError, 'output': []});
                        return;
                    }
                    results1.forEach(element => {
                        element.Image = Buffer.from(element.Image).toString('base64');
                    });
                    // console.log(results1);
                    results[1]=results1[0];
                    
                    resolve({'returncode': 0, 'message': 'Successful', 'output': results});
                });

            });
        });
    });
};
module.exports = { product_deletion, products_insertion, product_fetch }