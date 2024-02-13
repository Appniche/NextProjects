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

const products = (category, subcategory, title, description, price, company, ratings, imageBuffer) => 
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

module.exports = { products }