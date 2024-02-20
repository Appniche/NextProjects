// <---- Required Libraries ---->
const mysql = require('mysql2');
const crypto = require('crypto');

// Create a connection pool to manage database connections
const pool = mysql.createPool(
{
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'STUDENTS',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Create a new student account
const account_create = (username, password ,email, phone)=>
{
    return new Promise((resolve, reject)=>
    {
        // Get a connection from the pool
        pool.getConnection((connection_error, connection)=>
        {
            if(connection_error)
            {
                reject({'returncode': 1, 'message': connection_error, 'output': []});
                return;
            }

            // Hash the password using SHA-256
            const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
            
            // Check if the user already exists
            connection.query('SELECT * FROM students WHERE Student_UserName=?', [username], (query_error, results) => 
            {
                if (query_error) 
                {
                    connection.release();
                    reject({ 'returncode': 1, 'message': query_error, 'output': [] });
                    return;
                }

                if (results.length > 0) 
                {
                    connection.release();
                    reject({ 'returncode': 1, 'message': 'Account Exists Please Sign In', 'output': [] });
                    return;
                }

                // If the user doesn't exist, create a new account
                const query = 'INSERT INTO students (Student_UserName, Student_PasswordHash, Student_Phone, Student_Email) VALUES (?, ?, ?, ?)';
                connection.query(query, [username, hashedPassword, phone, email], (queryError, results) => 
                {
                    connection.release();
                    if(queryError)
                    {
                        reject({'returncode': 1, 'message': queryError, 'output': []});
                        return;
                    }

                    resolve({'returncode': 0, 'message': 'User Creation successful', 'output': results[0]});
                });
            });
        });
    });
}

// Update an existing student account
const account_update = (username, password, email, phone, userid) => 
{
    return new Promise((resolve, reject) => 
    {
        // Get a connection from the pool
        pool.getConnection((connection_error, connection) => 
        {
            if (connection_error) 
            {
                reject({ 'returncode': 1, 'message': connection_error, 'output': [] });
            }

            // Hash the password using SHA-256
            const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

            // Check if the user exists
            connection.query('SELECT * FROM students WHERE Student_Id=?', [userid], (queryError, results) => 
            {
                if (queryError) 
                {
                    connection.release();
                    reject({ 'returncode': 1, 'message': queryError, 'output': [] });
                    return;
                }

                // If the user doesn't exist, reject the promise with an error message
                if (results.length === 0) 
                {
                    connection.release();
                    reject({ 'returncode': 1, 'message': 'User not found', 'output': [] });
                    return;
                }

                // If the user exists, update the account
                const query = 'UPDATE students SET Student_UserName=?, Student_PasswordHash=?, Student_Phone=?, Student_Email=? WHERE Student_Id=?';
                connection.query(query, [username, hashedPassword, email, phone, userid], (query_Error, results) => 
                {
                    connection.release();
                    if (query_Error) 
                    {
                        reject({ 'returncode': 1, 'message': query_Error, 'output': [] });
                        return;
                    }

                    // Resolve the promise with the result of the update operation
                    resolve({ 'returncode': 0, 'message': 'Account Updated', 'output': results[0] });
                });
            });
        });
    });
}

// Remove an existing student account
const account_delete = (userid) => 
{
    return new Promise((resolve, reject) => 
    {
        // Get a connection from the pool
        pool.getConnection((connection_error, connection) => 
        {
            if (connection_error) 
            {
                reject({ 'returncode': 1, 'message': connection_error, 'output': [] });
            }

            // Check if the user exists
            connection.query('SELECT * FROM students WHERE Student_Id=?', [userid], (queryError, results) => 
            {
                if (queryError) 
                {
                    connection.release();
                    reject({ 'returncode': 1, 'message': queryError, 'output': [] });
                    return;
                }

                // If the user doesn't exist, reject the promise with an error message
                if (results.length === 0) 
                {
                    connection.release();
                    reject({ 'returncode': 1, 'message': 'User not found', 'output': [] });
                    return;
                }

                // If the user exists, delete the account
                const query = 'DELETE FROM students WHERE Student_Id=?';
                connection.query(query, [userid], (query_Error, results) => 
                {
                    connection.release();
                    if (query_Error) 
                    {
                        reject({ 'returncode': 1, 'message': query_Error, 'output': [] });
                        return;
                    }

                    // Resolve the promise with the result of the delete operation
                    resolve({ 'returncode': 0, 'message': 'Account Deleted', 'output': results[0] });
                });
            });
        });
    });
}

const account_login = (username, password) => 
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
            const query = 'SELECT * FROM students WHERE Student_UserName = ? AND Student_PasswordHash = ?';
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


module.exports = { account_create, account_update, account_delete, account_login };
