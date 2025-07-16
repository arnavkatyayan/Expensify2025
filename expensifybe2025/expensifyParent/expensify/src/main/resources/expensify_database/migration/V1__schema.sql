Create SCHEMA IF NOT EXISTS expensifyschema;

CREATE TABLE expensifyschema.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);