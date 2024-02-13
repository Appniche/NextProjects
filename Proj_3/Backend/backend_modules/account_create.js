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

const register = (username, email, password) => 
{
    return new Promise((resolve, reject) => 
    {
        pool.getConnection((connection_err, connection) => 
        {
            if (connection_err) 
            {
                reject({'returncode': 1, 'message': connection_err, 'output': []});
                return;
            }
    
            const hashedEnteredPassword = crypto.createHash('sha256').update(password).digest('hex');
            const query = 'INSERT INTO users (UserName, Email, PasswordHash, UserType) VALUES (?, ?, ?, ?)';
            
            connection.query(query, [username, email, hashedEnteredPassword, 'User'], (queryError, results) => 
            {
                connection.release();
        
                if (queryError) 
                {
                    reject({'returncode': 1, 'message': queryError, 'output': []});
                    return;
                }
        
                resolve({'returncode': 0, 'message': 'User registration successful', 'output': results});
            });
        });
    });
};

  
const admin_register = (username, email, password) => 
{
    return new Promise((resolve, reject) => 
    {
      pool.getConnection((connection_error, connection) => 
	  	{
			if (connection_error) 
			{
				reject({'returncode': 1, 'message': connection_error, 'output': []});
				return;
			}

			const hashedEnteredPassword = crypto.createHash('sha256').update(password).digest('hex');
			const query = 'INSERT INTO users (UserName, Email, PasswordHash, UserType) VALUES (?, ?, ?, ?)';
			
			connection.query(query, [username, email, hashedEnteredPassword, 'Company'], (queryError, results) => 
			{
				connection.release();
				if (queryError) 
				{
					reject({'returncode': 1, 'message': queryError, 'output': []});
					return;
				}

				resolve({'returncode': 0, 'message': 'User registration successful', 'output': results});
			});
      	});
    });
};

module.exports = { register, admin_register };
