const request = require('supertest');
const app = require('../app');

const prefix = "/api/v1/projects";

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
        expect(res.body).toEqual(expect.objectContaining({
            ID: expect.any(Number),
            title: expect.any(String),
            description: expect.any(String),
            content: expect.any(String),
            dateRegistered: expect.any(String)
        }));
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