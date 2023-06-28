CREATE DATABASE magazine_pgsql;

CREATE TABLE clothes(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT current_timestamp,
    size TEXT,
    price INTEGER
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    email VARCHAR(255),
    password TEXT
);

CREATE TABLE buying(
    id TEXT,
    usersid INTEGER,
    clothesid INTEGER
);

