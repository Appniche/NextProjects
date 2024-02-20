CREATE DATABASE UNIVERSITIES;

CREATE TABLE countries(
    CountryId INT AUTO_INCREMENT PRIMARY KEY,
    Country VARCHAR(100) NOT NULL,
    Description VARCHAR(255) NOT NULL,
);

CREATE TABLE universities(
    University_Id INT AUTO_INCREMENT PRIMARY KEY,
    University_Name VARCHAR(100) NOT NULL,
    University_Location VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    University_Ranking VARCHAR(3) NOT NULL,
    University_AdmissionProcess VARCHAR(255) NOT NULL,
);

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
