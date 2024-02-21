// <---- Required Libraries ---->
const mysql = require('mysql2');

// Create a connection pool to manage database connections
const pool = mysql.createPool(
{
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'APPLICATIONS',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Create a new application
const add = ( course_id, student_id, app_status, travel_status, payment_status, remaining_amt)=>
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
            const query = 'INSERT INTO applications (CourseID, StudentID, Application_Status, Application_TravelStatus, Application_PaymentStatus, Application_RemainingPayment) VALUES (?, ?, ?, ?, ?, ?)';
            connection.query(query, [course_id, student_id, app_status, travel_status, payment_status, remaining_amt], (queryError, results) => 
            {
                connection.release();
                if(queryError)
                {
                    reject({'returncode': 1, 'message': queryError, 'output': []});
                    return;
                }

                resolve({'returncode': 0, 'message': 'University added successfully', 'output': results[0]});
            });
        });
    });
}

module.exports = { add };