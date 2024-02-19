CREATE DATABASE STUDENTS;

CREATE TABLE students(
    Student_Id INT AUTO_INCREMENT PRIMARY KEY,
    Student_UserName VARCHAR(100) NOT NULL,
    Student_PasswordHash VARCHAR(100) NOT NULL,
    Student_Phone VARCHAR(12) NOT NULL,
    Student_Email VARCHAR(100) NOT NULL,
);

CREATE TABLE student_registration(
    Student_RegistrationId INT AUTO_INCREMENT PRIMARY KEY,
    StudentID INT NOT NULL,
    Student_FirstName VARCHAR(100) NOT NULL,
    Student_LastName VARCHAR(100) NOT NULL,
    Student_DOB VARCHAR(20) NOT NULL,
    Student_Address VARCHAR(255) NOT NULL,
    Student_ProfilePic LONGBLOB NOT NULL,
    FOREIGN KEY (StudentID) REFERENCES students(Student_Id)
);

CREATE TABLE student_documents(
    Student_DocumentId INT AUTO_INCREMENT PRIMARY KEY,
    StudentID INT NOT NULL,
    Student_DocumentName VARCHAR(100) NOT NULL,
    Student_Document LONGBLOB NOT NULL,
    FOREIGN KEY (StudentID) REFERENCES students(Student_Id)
);

CREATE TABLE student_feedbacks(
    Student_FeedbackId INT AUTO_INCREMENT PRIMARY KEY,
    StudentID INT NOT NULL,
    Student_Feedback VARCHAR(255) NOT NULL,
    Student_FeedbackTime DATETIME NOT NULL,
    FOREIGN KEY (StudentID) REFERENCES students(Student_Id)
);