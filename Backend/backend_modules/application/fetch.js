// <---- Required Libraries ---->
const mysql = require('mysql2');

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

const counsellor = () =>
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
            const query = 'SELECT * FROM applications a, UNIVERSITIES.university_courses u, STUDENTS.students s, STUDENTS.student_registration sr, STUDENTS.student_documents sd,  WHERE a.CourseID=u.Course_Id AND a.StudentID=s.Student_Id AND sr.StudentID=s.Student_Id AND sd.StudentID;';
            connection.query(query, (queryError, results) => {
            connection.release();
    
            if (queryError) {
                reject({'returncode': 1, 'message': queryError, 'output': []});
                return;
            }
    
            if (results.length > 0) 
            {
                results.forEach(element => {
                    element.Image = Buffer.from(element.Image).toString('base64');
                  });
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

const students = () =>
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
            const query = 'SELECT * FROM applications a, UNIVERSITIES.university_courses u, STUDENTS.students s WHERE a.CourseID=u.Course_Id AND a.StudentID=s.Student_Id;';
            connection.query(query, (queryError, results) => {
            connection.release();
    
            if (queryError) {
                reject({'returncode': 1, 'message': queryError, 'output': []});
                return;
            }
    
            if (results.length > 0) 
            {
                results.forEach(element => {
                    element.Image = Buffer.from(element.Image).toString('base64');
                  });
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


module.exports = { counsellor, students };