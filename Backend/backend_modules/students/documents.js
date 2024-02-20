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

const document_add = (userid, doc_name, doc_buffer) => 
{
    return new Promise((resolve, reject)=>
    {
        pool.getConnection((connection_error, connection)=>
        {
            if(connection_error)
            {
                reject({'returncode': 1, 'message': connection_error, 'output': []});
                return;
            }

            // Check if the user already exists
            connection.query('SELECT * FROM students WHERE Student_Id=?', [userid], (query_error, results) => 
            {
                if (query_error) 
                {
                    connection.release();
                    reject({ 'returncode': 1, 'message': query_error, 'output': [] });
                    return;
                }

                // If the user doesn't exist, reject the promise with an error message
                if (results.length === 0) 
                {
                    connection.release();
                    reject({ 'returncode': 1, 'message': 'Account Not Found', 'output': [] });
                    return;
                }

                // Add a new document
                const query = 'INSERT INTO student_documents (StudentID, Student_DocumentName, Student_Document) VALUES (?, ?, ?)';
                connection.query(query,[userid, doc_name, doc_buffer],(query_error, results)=>
                {
                    connection.release();
                    if(query_error)
                    {
                        reject({ 'returncode': 1, 'message': query_error, 'output': [] });
                    }

                    resolve({'returncode': 0, 'message': 'Add Document', 'output': results[0]});
                }); 
            });
        });
    });
}

// Remove an existing student account
const document_delete = (doc_id, userid) => 
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
                const query = 'DELETE FROM student_documents WHERE Student_DocumentId=?';
                connection.query(query, [doc_id], (query_Error, results) => 
                {
                    connection.release();
                    if (query_Error) 
                    {
                        reject({ 'returncode': 1, 'message': query_Error, 'output': [] });
                        return;
                    }

                    // Resolve the promise with the result of the delete operation
                    resolve({ 'returncode': 0, 'message': 'Document Deleted', 'output': results[0] });
                });
            });
        });
    });
}

module.exports={ document_add, document_delete }