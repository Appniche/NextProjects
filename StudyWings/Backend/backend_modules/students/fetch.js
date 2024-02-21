// <---- Required Libraries ---->
const mysql = require('mysql2');

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

// Fetch Student Registration Information
const registration_info = (user_id)=>
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


            // Adding a new Country
            const query = 'SELECT * FROM student_registration WHERE StudentID=?';
            connection.query(query, [user_id], (queryError, results) => 
            {
                connection.release();
                if(queryError)
                {
                    reject({'returncode': 1, 'message': queryError, 'output': []});
                    return;
                }
                if(results.length > 0)
                {
                    resolve({'returncode': 0, 'message': 'Fetched successfully', 'output': results[0]});
                    return;
                    
                }
                else
                {
                    reject({'returncode': 1, 'message': 'Fetch unsuccessful', 'output': []});
                    return;
                }

            });
        });
    });
}

module.exports = { registration_info };