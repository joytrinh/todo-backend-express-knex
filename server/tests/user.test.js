/**
 * @jest-environment node
 */
const request = require('supertest');
const app = require('../server.js');
const db = require('../database/connection.js');

describe('User Routes', () => {
    let userId;

    afterAll(async () => {
        await db.destroy();
    });
    
    test('POST /users should create a new user', async () => {
        const newUser = { name: 'John Doe', email: 'johndoe@gmail.com'};
        const response = await request(app).post('/users').send(newUser);
        userId = response.body.data.id; // Store the user ID for later tests
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('data');
    });

    test('GET /users should return all users', async () => {
        const response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    test('GET /users/:id should return a user by ID', async () => {
        const response = await request(app).get(`/users/${userId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.id).toBe(userId);
    });

    test('GET /users/:id should return 404 for non-existent user', async () => {
        const response = await request(app).get('/users/99999');
        expect(response.statusCode).toBe(404);
    });

    test('POST /users should return 400 if no email or name', async () => {
        const newUser = { name: '', email: ''};
        const response = await request(app).post('/users').send(newUser);
        expect(response.statusCode).toBe(400);
    });

    test('POST /users should return 400 if no email or name', async () => {
        const newUser = { name: 'John Doe', email: 'johndoe@gmail.com'};
        const response = await request(app).post('/users').send(newUser);
        expect(response.statusCode).toBe(409); // same email
    });

    test('PATCH /users should update user', async () => {
        const updatingUser = { name: 'John Updated', email: 'johndoe@gmail.com'};
        const response = await request(app).patch(`/users/${userId}`).send(updatingUser);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
    });

    test('DELETE /users should delete user', async () => {
        const response = await request(app).delete(`/users/${userId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
})