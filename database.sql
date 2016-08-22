-- Create Table:
CREATE TABLE tasks (
  id serial primary key,
  todo varchar(100),
  todo_number int);

--Add completed column:
ALTER TABLE tasks ADD COLUMN
completed varchar(25);

--Delete a task from tasks:
DELETE FROM tasks,
WHERE id = 1;
