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

const login = (username, password) => 
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

            const hashedEnteredPassword = crypto.createHash('sha256').update(password).digest('hex'); 
            const query = 'SELECT * FROM users WHERE UserName = ? AND PasswordHash = ?';
            connection.query(query, [username, hashedEnteredPassword], (queryError, results) => 
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
                    resolve({'returncode': 0, 'message': 'Authentication successful', 'output': results[0]});
                } 
                
                else 
                {
                    // User not found or incorrect credentials
                    reject({'returncode': 1, 'message': 'Authentication failed', 'output': []});
                }
            });
        });
    });
};

const admin_login = (username, password) => 
{
    return new Promise((resolve, reject) => 
    {
        pool.getConnection((err, connection) => 
        {
            if (err) 
            {
                reject({'returncode': 1, 'message': 'Error connecting to MariaDB', 'output': []});
                return;
            }

            const hashedEnteredPassword = crypto.createHash('sha256').update(password).digest('hex'); 
            const query = 'SELECT * FROM users WHERE UserName = ? AND PasswordHash = ?';
            connection.query(query, [username, hashedEnteredPassword], (queryError, results) => 
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
                    resolve({'returncode': 0, 'message': 'Authentication successful', 'output': results[0]});
                    } else {
                    // User not found or incorrect credentials
                    reject({'returncode': 1, 'message': 'Authentication failed', 'output': []});
                }
            });
        });
    });
};

module.exports = { login, admin_login };