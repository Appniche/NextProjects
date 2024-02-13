// <---- Required Libraries ---->
const mysql = require('mysql2');
const crypto = require('crypto');

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

const categories = (category_name) => 
{
    return new Promise((resolve, reject) => 
    {
        pool.getConnection((connection_error, connection) => 
        {
            if (connection_error) 
            {
                reject({'returncode': 1, 'message': 'Error connecting to MariaDB', 'output': []});
                return;
            }

            const query = 'SELECT * FROM products p, categories c WHERE c.Name = ? AND  p.CategoryID = c.CategoryId;';
            connection.query(query, [category_name], (queryError, results) => 
            {
                connection.release();
        
                if (queryError) 
                {
                    reject({'returncode': 1, 'message': queryError, 'output': []});
                    return;
                }
        
                if (results.length > 0) 
                {
                    // User authenticated successfully
                    resolve({'returncode': 0, 'message': 'Fetch successful', 'output': results});
                } 
                
                else 
                {
                    // User not found or incorrect credentials
                    reject({'returncode': 1, 'message': 'Fetch failed', 'output': []});
                }
            });
        });
    });
};

const subcategory = (subcategory_name) => 
{
    return new Promise((resolve, reject) => 
    {
        pool.getConnection((connection_error, connection) => 
        {
            if (connection_error) 
            {
                reject({'returncode': 1, 'message': 'Error connecting to MariaDB', 'output': []});
                return;
            }

            const query = 'SELECT * FROM products WHERE SubCategoryName = ?;';
            connection.query(query, [subcategory_name], (queryError, results) => 
            {
                connection.release();
        
                if (queryError) 
                {
                    reject({'returncode': 1, 'message': queryError, 'output': []});
                    return;
                }
        
                if (results.length > 0) 
                {
                    // Fetch successful
                    resolve({'returncode': 0, 'message': 'Fetch successful', 'output': results});
                } 
                
                else 
                {
                    // Data not found
                    reject({'returncode': 1, 'message': 'Fetch failed', 'output': []});
                }
            });
        });
    });
};

const company_name = (company_name) => 
{
    return new Promise((resolve, reject) => 
    {
        pool.getConnection((connection_error, connection) => 
        {
            if (connection_error) 
            {
                reject({'returncode': 1, 'message': 'Error connecting to MariaDB', 'output': []});
                return;
            }

            const query = 'SELECT * FROM products WHERE Company = ?;';
            connection.query(query, [company_name], (queryError, results) => 
            {
                connection.release();
        
                if (queryError) 
                {
                    reject({'returncode': 1, 'message': queryError, 'output': []});
                    return;
                }
        
                if (results.length > 0) 
                {
                    // Fetch successful
                    resolve({'returncode': 0, 'message': 'Fetch successful', 'output': results});
                } 
                
                else 
                {
                    // Data not found
                    reject({'returncode': 1, 'message': 'Fetch failed', 'output': []});
                }
            });
        });
    });
};

const products = () =>
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
            const query = 'SELECT * FROM products;';
            connection.query(query, (queryError, results) => {
            connection.release();
    
            if (queryError) {
                reject({'returncode': 1, 'message': queryError, 'output': []});
                return;
            }
    
            if (results.length > 0) 
            {
                // Destinations Fetched
                resolve({'returncode': 0, 'message': 'Fetched Products', 'output': results});
            } 
            else 
            {
                // No Destinations are available
                reject({'returncode': 1, 'message': 'No Products found', 'output': []});
            }
            });
        });
    });
};


module.exports = { categories, subcategory, company_name, products };