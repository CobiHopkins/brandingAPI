const request = require('supertest');
const app = require('../app');
const { generateToken } = require('../helpers/jwt');

const prefix = "/api/v1/projects";
const bearer = generateToken({ ID: 1, role_id: 2 })
const invalidJwt = generateToken({ ID: 9999, role_id: 1});

const validPostObject = {
        "title": 'JEST project test',
        "description": 'A long description for the creation of a new project in jest.',
        "githubUrl": 'https://github.com/user/repo/socialmediaapi',
        "content": 	"content goes here" 
}


/*
 * ALL TESTS FOR OBTAINING AND INTERACTING WITH A FULL LIST OF PROJECTS
 * INCLUDING PROVIDING THE FOLLOWING FUNCTIONS:
 *  --- [GET, POST] ---
 *
*/

// GET ALL
describe('Get a list of projects', () => {
    it('Returns a status code of 200 and a list of project objects', async () => {
        const res = await request(app)
            .get(prefix);

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        res.body.forEach((project) => {
            expect(project).toEqual(expect.objectContaining({
                ID: expect.any(Number),
                title: expect.any(String),
                description: expect.any(String),
                content: expect.any(String)
            }));
        });
    });
});

//GET BY ID
describe('Get a project by ID', () => {
    it('Returns a project', async () => {
        const res = await request(app)
            .get(`${prefix}/1`);

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        res.body.forEach((project) => {
            expect(project).toEqual(expect.objectContaining({
                ID: expect.any(Number),
                title: expect.any(String),
                description: expect.any(String),
                content: expect.any(String)
            }));
        });
    });
});

//GET TAGS BY ID
describe('Get a projects tags by project ID', () => {
    it('Returns a list of tags', async () => {
        const res = await request(app)
            .get(`${prefix}/1/tags`);

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);

        res.body.forEach((tag) => {
            expect(tag).toEqual(expect.objectContaining({
                project_id: 1,
                tag_id: expect.any(Number),
                ID: expect.any(Number),
                name: expect.any(String),
                colour: expect.any(String),
                dateRegistered: expect.any(String)
            }));
        });

        expect(res.body[0]).toHaveProperty('ID', 1);
        expect(res.body[0]).toHaveProperty('name', 'JavaScript');
        expect(res.body[0]).toHaveProperty('colour', 'cdbe08');
    });
});

//POST NEW PROJECT
describe('Create a new project (all valid details)', () => {
    it('Returns http code 201 with object', async () => {
        const res = await request(app)
            .post(prefix)
            .set('Authorization', `Bearer ${bearer}`)
            .send(validPostObject);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(expect.objectContaining({
            ID: expect.any(Number),
            Created: true
        }));
    })
})

describe('Create a new project without jwt', () => {
    it('Returns http code 401 - Unauthorized', async () => {
        const res = await request(app)
            .post(prefix)
            .send(validPostObject);

        expect(res.statusCode).toEqual(401);
    });
});

describe('Create new project with invalid data, but contain jwt', () => {
    it('Returns http code 400 with error message', async () => {
        const res = await request(app)
            .post(prefix)
            .set('Authorization', `Bearer ${bearer}`)
            .send({
                title: 'This title is longer than the 20 char length',
                description: 'This is a valid description for the project',
                githubUrl: 'https://github.com/cobihopins/socialmediaapi',
                content: 'This is also a valid content property which means only the title is invalid'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual(expect.objectContaining({
            message: "\"title\" length must be less than or equal to 20 characters long"
        }));
    });
});

describe('Create a new project with an invalid jwt', () => {
    it('Returns http code 401', async () => {
        const res = await request(app)
            .post(prefix)
            .set('Authorization', `Bearer ${invalidJwt}`)
            .send(validPostObject);
            
        expect(res.statusCode).toEqual(401);
    })
})

describe('Create a new project with invalid githubUrl', () => {
    it('Returns http code 400 and error message', async () => {
        const res = await request(app)
            .post(prefix)
            .set('Authorization', `Bearer ${bearer}`)
            .send({
                title: 'Valid title',
                description: 'A valid description',
                content: 'Valid content',
                githubUrl: 'https://google.com'
            });

        //SET EXPECTS
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual(expect.objectContaining({
            message: "\"githubUrl\" with value \"https://google.com\" fails to match the required pattern: /^https:\\/\\/github\\.com(\\/[\\w\\-]*)*$/"
        }));
    });
});

// POST NEW PROJECT TAGS
describe('Add some new tags to an existing project with valid jwt', () => {
    it('Returns status code 200 and object', async () => {
        const res = await request(app)
            .post(`${prefix}/4/tags`)
            .set('Authorization', `Bearer ${bearer}`)
            .send({
                tags: ["JavaScript", "Mobile Development"]
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(expect.objectContaining({
            ID: expect.any(Number),
            Created: true,
            
        }));
    });
});

describe('Add some new tags to an existing project with jwt but invalid tag name', () => {
    it('Returns https code 400 and error message', async () => {
        const res = await request(app)
            .post(`${prefix}/4/tags`)
            .set('Authorization', `Bearer ${bearer}`)
            .send({
                tags: ['NonExistantTag', 'JavaScript']
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual(expect.objectContaining({
            message: 'Some tags are invalid.'
        }));
    });
});

describe('Add a new tag to an invalid id project', () => {
    it('Returns http code 404', async () => {
        const res = await request(app)
            .post(`${prefix}/9999/tags`)
            .set('Authorization', `Bearer ${bearer}`)
            .send({
                tags: ['JavaScript']
            });

        expect(res.statusCode).toEqual(404);
    });
});

describe('Add some new tags to an existing project with invalid jwt', () => {
    it('Returns http code 401', async () => {
        const res = await request(app)
            .post(`${prefix}/4/tags`)
            .set('Authorization', `Bearer ${invalidJwt}`)
            .send({
                tags: ['Backend Development']
            });

        expect(res.statusCode).toEqual(401);
    });
});

describe('Add some new tags to an existing project without jwt', () => {
    it('Returns http code 401', async () => {
        const res = await request(app)
            .post(`${prefix}/4/tags`)
            .send({
                tags: ["JavaScript", "Mobile Development"]
            });

        expect(res.statusCode).toEqual(401);
    });
});

//PUT EXISTING POST
describe('Update a current project with all valid fields', () => {
    it('Returns http code 200 and object', async () => {
        const res = await request(app)
            .put(`${prefix}/4`)
            .set('Authorization', `Bearer ${bearer}`)
            .send({
                title: 'Updated jest title',
                description: 'An updated jet description'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.objectContaining({
            ID: 4,
            name: 'Updated jest title',
            Created: true
        }));
    });
});

describe('Update a project with invalid jwt.', () => {
    it('Returns http code 401', async () => {
        const res = await request(app)
            .put(`${prefix}/4`)
            .set('Authorization', `Bearer ${invalidJwt}`)
            .send({
                title: 'Updated jest title',
                description: 'An updated jet description'
            });

        expect(res.statusCode).toEqual(401);
    });
});

describe('Update a project without a jwt', () => {
    it('Returns http code 401', async () => {
        const res = await request(app)
            .put(`${prefix}/3`)
            .send({
                description: 'This is an updated description for a project update in jest / supertest.'
            });

        expect(res.statusCode).toEqual(401);
    });
});

describe('Update a protected project property', () => {
    it('Returns error code 400 and message', async () => {
        const res = await request(app)
            .put(`${prefix}/4`)
            .set('Authorization', `Bearer ${bearer}`)
            .send({
                ID: 9,
                title: 'new jest title',
                description: 'new jest description'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual(expect.objectContaining({
            message: "\"ID\" is not allowed"
        }));
    });
});

describe('Update a property that does not exist', () => {
    it('Returns an error code of 400 and message', async () => {
        const res = await request(app)
            .put(`${prefix}/4`)
            .set('Authorization', `Bearer ${bearer}`)
            .send({
                title: 'Updating the title',
                description: 'Updating the description now',
                asda: 'This does not exist'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual(expect.objectContaining({
            message: "\"asda\" is not allowed"
        }));
    })
})

// ALL DELETE TESTS
describe('Delete a project without a jwt provided', () => {
    it('Returns http code 401', async () => {
        const res = await request(app)
            .delete(`${prefix}/2`);

        expect(res.statusCode).toEqual(401);
    });
});

describe('Delete a project with an invalid jwt token provided', () => {
    it('Returns http code 401', async () => {
        const res = await request(app)
            .delete(`${prefix}/2`)
            .set('Authorization', `Bearer ${invalidJwt}`);

        expect(res.statusCode).toEqual(401);
    });
});

describe('Delete a project with an invalid id', () => {
    it('Returns http code 404', async () => {
        const res = await request(app)
            .delete(`${prefix}/9999`)
            .set('Authorization', `Bearer ${bearer}`);

        expect(res.statusCode).toEqual(404);
    });
});

describe('Delete a project with all valid info', () => {
    it('Returns http code 200 and object', async () => {
        const res = await request(app)
            .delete(`${prefix}/2`)
            .set('Authorization', `Bearer ${bearer}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.objectContaining({
            ID: expect.any(Number),
            Deleted: true
        }));
    });
});