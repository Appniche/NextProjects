CREATE DATABASE STUDENTS;

USE STUDENTS;

-- 1.
CREATE TABLE students(
    Student_Id INT AUTO_INCREMENT PRIMARY KEY,
    Student_UserName VARCHAR(100) NOT NULL,
    Student_PasswordHash VARCHAR(100) NOT NULL,
    Student_Phone VARCHAR(12) NOT NULL,
    Student_Email VARCHAR(100) NOT NULL
);

CREATE DATABASE UNIVERSITIES;

USE UNIVERSITIES;

-- 2.
CREATE TABLE countries(
    CountryId INT AUTO_INCREMENT PRIMARY KEY,
    Country VARCHAR(100) NOT NULL,
    Description VARCHAR(255) NOT NULL,
);

-- 3.
CREATE TABLE universities(
    University_Id INT AUTO_INCREMENT PRIMARY KEY,
    University_Name VARCHAR(100) NOT NULL,
    University_Location VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    University_Ranking VARCHAR(3) NOT NULL,
    University_AdmissionProcess VARCHAR(255) NOT NULL,
);

-- 4.
CREATE TABLE university_courses(
    Course_Id INT AUTO_INCREMENT PRIMARY KEY,
    UniversityID INT NOT NULL,
    CountryID INT NOT NULL,
    Course_Name VARCHAR(100) NOT NULL,
    Course_Description VARCHAR(255) NOT NULL,
    Course_Duration INT NOT NULL,
    Course_Fees VARCHAR(10) NOT NULL,
    Course_StartDate DATE NOT NULL,
    Course_EndDate DATE NOT NULL,
    Course_Status VARCHAR(100) NOT NULL
    FOREIGN KEY (CountryID) REFERENCES countries(CountryId)
    FOREIGN KEY (UniversityID) REFERENCES universities(University_Id)
);


CREATE DATABASE COUNSELLATION;

USE COUNSELLATION;

-- 5.
CREATE TABLE counsellors(
    Counsellor_Id INT AUTO_INCREMENT PRIMARY KEY,
    Counsellor_UserName VARCHAR(100) NOT NULL,
    Counsellor_Email VARCHAR(100) NOT NULL,
    Counsellor_PasswordHash VARCHAR(100) NOT NULL,
    Counsellor_FirstName VARCHAR(100) NOT NULL,
    Counsellor_LastName VARCHAR(100) NOT NULL,
    Counsellor_Department VARCHAR(100) NOT NULL,
    Counsellor_Specialization VARCHAR(100) NOT NULL,
    CourseID INT NOT NULL,
    FOREIGN KEY (CourseID) REFERENCES UNIVERSITIES.university_courses(Course_Id)
);


-- 6.
CREATE TABLE counsellation_sessions(
    Counsellation_Id INT AUTO_INCREMENT PRIMARY KEY,
    StudentID INT NOT NULL,
    CounsellorID INT NOT NULL,
    Counsellation_Specification VARCHAR(255) NOT NULL,
    Counsellation_Time DATETIME NOT NULL,
    Counsellation_Link VARCHAR(255) NOT NULL,
    FOREIGN KEY (StudentID) REFERENCES STUDENTS.students(Student_Id)
    FOREIGN KEY (CounsellorID) REFERENCES counsellors(Counsellor_Id)
);


CREATE DATABASE APPLICATIONS;

USE APPLICATIONS;

-- 7.
CREATE TABLE applications(
    Application_Id INT AUTO_INCREMENT PRIMARY KEY,
    CourseID INT NOT NULL,
    StudentID INT NOT NULL,
    Application_Status VARCHAR(100) NOT NULL,
    Application_TravelStatus VARCHAR(100) NOT NULL,
    Application_PaymentStatus VARCHAR(100) NOT NULL,
    Application_RemainingPayment VARCHAR(10),
    FOREIGN KEY (CourseID) REFERENCES UNIVERSITIES.university_courses(Course_Id),
    FOREIGN KEY (StudentID) REFERENCES STUDENTS.students(Student_Id)
);

USE STUDENTS;

-- 8.
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


-- 9.
CREATE TABLE student_documents(
    Student_DocumentId INT AUTO_INCREMENT PRIMARY KEY,
    StudentID INT NOT NULL,
    Student_DocumentName VARCHAR(100) NOT NULL,
    Student_Document LONGBLOB NOT NULL,
    FOREIGN KEY (StudentID) REFERENCES students(Student_Id)
);

-- 10.
CREATE TABLE student_feedbacks(
    Student_FeedbackId INT AUTO_INCREMENT PRIMARY KEY,
    StudentID INT NOT NULL,
    Student_Feedback VARCHAR(255) NOT NULL,
    Student_FeedbackTime DATETIME NOT NULL,
    FOREIGN KEY (StudentID) REFERENCES students(Student_Id)
);

--11.
CREATE TABLE predepart_sessions(
    Predepart_Id INT AUTO_INCREMENT PRIMARY KEY,
    CounsellorID INT NOT NULL,
    StudentID INT NOT NULL,
    Predepart_Time DATETIME NOT NULL,
    Predepart_Link VARCHAR(255) NOT NULL,
    FOREIGN KEY (StudentID) REFERENCES STUDENTS.students(Student_Id)
    FOREIGN KEY (CounsellorID) REFERENCES counsellors(Counsellor_Id)
);

CREATE DATABASE ROOT;

USE ROOT;

--12.
CREATE TABLE root(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(100) NOT NULL,
    PasswordHash VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL
);
