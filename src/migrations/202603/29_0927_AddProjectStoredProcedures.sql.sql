CREATE IF NOT EXISTS PROCEDURE prc_GetAllProjects()
    BEGIN
        SELECT * FROM projects
            LEFT JOIN project_tags ON projects.id = project_tags.project_id
            LEFT JOIN tags ON project_tags.tag_id = tags.id;
    END;

CREATE IF NOT EXISTS PROCEDURE prc_GetProjectById(IN p_id INT)
    BEGIN
        SELECT * FROM projects WHERE id = p_id
            LEFT JOIN project_tags ON projects.id = project_tags.project_id
            LEFT JOIN tags ON project_tags.tag_id = tags.id;
    END;

CREATE IF NOT EXISTS PROCEDURE prc_AddProject(
    IN p_id UUID, 
    IN p_name VARCHAR(255),
    IN p_description VARCHAR(255),
    IN p_githubUrl VARCHAR(255),
    IN p_websiteUrl VARCHAR(255),
    IN p_imageUrl VARCHAR(255),
    IN p_trelloUrl VARCHAR(255),
    IN p_content TEXT,
    IN p_createdAt TIMESTAMP
    )
    BEGIN
        INSERT INTO projects (id, name, description, githubUrl, websiteUrl, imageUrl, trelloUrl, content, createdAt)
        VALUES (p_id, p_name, p_description, p_githubUrl, p_websiteUrl, p_imageUrl, p_trelloUrl, p_content, p_createdAt);
    END;

CREATE IF NOT EXISTS PROCEDURE prc_UpdateProject(
    IN p_id UUID, 
    IN p_name VARCHAR(255),
    IN p_description VARCHAR(255),
    IN p_githubUrl VARCHAR(255),
    IN p_websiteUrl VARCHAR(255),
    IN p_imageUrl VARCHAR(255),
    IN p_trelloUrl VARCHAR(255),
    IN p_content TEXT
    )
    BEGIN
        UPDATE projects 
        SET name = p_name, description = p_description, githubUrl = p_githubUrl, websiteUrl = p_websiteUrl, imageUrl = p_imageUrl, trelloUrl = p_trelloUrl, content = p_content
        WHERE id = p_id;
    END;

CREATE IF NOT EXISTS PROCEDURE prc_DeleteProject(IN p_id UUID)
    BEGIN
        DELETE FROM projects WHERE id = p_id;
    END;