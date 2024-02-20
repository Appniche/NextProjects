// <---- Required Libraries ---->
const mysql = require('mysql2');

// Create a connection pool to manage database connections
const pool = mysql.createPool(
{
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'COUNSELLATION',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Create a new session
const session_add = (student_id, counsellor_id, time, link)=>
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

            // If the user doesn't exist, create a new account
            const query = 'INSERT INTO predepart_sessions (StudentID, CounsellorID, Predepart_Time, Predepart_Link) VALUES (?, ?, ?, ?)';
            connection.query(query, [student_id, counsellor_id, time, link], (queryError, results) => 
            {
                connection.release();
                if(queryError)
                {
                    reject({'returncode': 1, 'message': queryError, 'output': []});
                    return;
                }

                resolve({'returncode': 0, 'message': 'Session Added', 'output': results[0]});
            });
        });
    });
}


// Remove an existing session
const session_delete = (session_id) => 
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

            const query = 'DELETE FROM predepart_sessions WHERE Predepart_Id=?';
            connection.query(query, [session_id], (query_Error, results) => 
            {
                connection.release();
                if (query_Error) 
                {
                    reject({ 'returncode': 1, 'message': query_Error, 'output': [] });
                    return;
                }

                // Resolve the promise with the result of the delete operation
                resolve({ 'returncode': 0, 'message': 'Session Deleted', 'output': results[0] });
            });
        });
    });
}

module.exports = { session_add, session_delete };
