USE employee_db;

INSERT INTO departments(department_name)
VALUES
    ("Engineering"), 
    ("Sales"), 
    ("Finance"), 
    ("Legal"), 
    ("Marketing");

INSERT INTO roles(title, salary, department_id)
VALUES
    ("Engineer", 85000, 1), 
    ("Senior Engineer", 125000, 1), 
    ("CFO", 350000, 3), 
    ("Chief Counsel", 300000, 4);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES 
    ('Paul', 'Random', 1, 2), 
    ('Frank', 'Wyatt', 1, null), 
    ('Ali', 'Sheba', 1, 2), 
    ('Nick', 'Timothy', 2, 2), 
    ('Thomas', 'Legal', 4, null);
