CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS combinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    combination TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    combination_id INT,
    FOREIGN KEY (combination_id) REFERENCES combinations(id)
);
