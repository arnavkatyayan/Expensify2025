CREATE TABLE expensifyschema.income_info (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    income_source VARCHAR(100) NOT NULL,
    amount INTEGER NOT NULL,
    emoji VARCHAR(100),
    date VARCHAR(100) NOT NULL
);