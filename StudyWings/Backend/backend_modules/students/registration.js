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

// Student Registration Insert
const registration_details_add = (first_name,last_name, dob, address, profile_buffer, userid) =>
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

                // Create a new Registration
                const query = 'INSERT INTO student_registration (StudentID, Student_FirstName, Student_LastName, Student_DOB, Student_Address, Student_ProfilePic) VALUES (?, ?, ?, ?, ?, ?)';
                connection.query(query,[userid, first_name, last_name, dob, address, profile_buffer],(query_error, results)=>
                {
                    connection.release();
                    if(query_error)
                    {
                        reject({ 'returncode': 1, 'message': query_error, 'output': [] });
                    }

                    resolve({'returncode': 0, 'message': 'User registration successful', 'output': results[0]});
                }); 
            });
        });
    });
}

// Student Registration Update
const registration_details_update = (first_name,last_name, dob, address, profile_buffer, registration_id) =>
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

            // Check if the user registration already exists
            connection.query('SELECT * FROM student_registration WHERE Student_RegistrationId=?', [registration_id], (query_error, results) => 
            {
                if (query_error) 
                {
                    connection.release();
                    reject({ 'returncode': 1, 'message': query_error, 'output': [] });
                    return;
                }

                // If the user registration doesn't exist, reject the promise with an error message
                if (results.length === 0) 
                {
                    connection.release();
                    reject({ 'returncode': 1, 'message': 'Registration Details Not Found, Please Register', 'output': [] });
                    return;
                }

                // Update an existing Registration
                const query = 'UPDATE student_registration SET Student_FirstName=?, Student_LastName=?, Student_DOB=?, Student_Address=?, Student_ProfilePic=? WHERE Student_RegistrationId=?';
                connection.query(query,[first_name, last_name, dob, address, profile_buffer, registration_id],(query_error, results)=>
                {
                    connection.release();
                    if(query_error)
                    {
                        reject({ 'returncode': 1, 'message': query_error, 'output': [] });
                    }

                    resolve({'returncode': 0, 'message': 'User registration update successful', 'output': results[0]});
                }); 
            });
        });
    });
}

module.exports={ registration_details_add, registration_details_update }