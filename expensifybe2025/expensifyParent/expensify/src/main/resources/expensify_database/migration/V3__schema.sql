CREATE TABLE expensifyschema.expense_info (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    expense_source VARCHAR(100) NOT NULL,
    amount INTEGER NOT NULL,
    emoji VARCHAR(100),
    date VARCHAR(100) NOT NULL
);