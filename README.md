# Celestials Project

## Install NodeJS in Ubuntu
```
sudo apt update
sudo apt install -y nodejs
node -v
```

## JSON Overview
- JavaScript Object Notation ( JSON )
- It is a text file
- It can be created using regular text editors
- Just like XML, JSON format is used to store and retrieve data

## Install SQLite in Ubuntu
```
sudo apt update
sudo apt install sqlite3
sqlite3 --version
```
## SQLite Overview
- SQLite is a light-weight RDBMS
- It supports storing data in the memory or in a file
- It supports structured query language to create database, table, etc

## Creating a Database

Let's create a database
```
sqlite3 cit.db
```

Let's create the students table inside the cit database
```
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    department TEXT NOT NULL,
    branch TEXT NOT NULL,
    year TEXT NOT NULL,
    interests TEXT NOT NULL
);
```
Inserting student record

