CREATE TABLE IF NOT EXISTS users(
    ID INT NOT NULL AUTO_INCREMENT,
    role_id INT DEFAULT 1,
    firstName VARCHAR(32),
    lastName VARCHAR(32),
    username VARCHAR(16) UNIQUE NOT NULL,
    dateRegistered DATETIME DEFAULT CURRENT_TIMESTAMP,
    password VARCHAR(60),
    passwordSalt VARCHAR(32),
    email VARCHAR(64) UNIQUE NOT NULL,
    avatarURL VARCHAR(128),
    PRIMARY KEY (ID),
    FOREIGN KEY (role_id) REFERENCES roles (ID)
);