ALTER TABLE expensifyschema.expense_info
ADD COLUMN is_recurring BOOLEAN NOT NULL DEFAULT FALSE;
