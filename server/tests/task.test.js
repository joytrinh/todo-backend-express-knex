/**
 * @jest-environment node
 */
const request = require('supertest');
const app = require('../server.js');
const db = require('../database/connection.js');

describe('Task Routes', () => {
    let todo_id, user_id;

    beforeAll(async () => {
        const todo = await db('todos').insert({ title: 'Test Todo' }).returning('id');
        const user = await db('users').insert({ name: 'Test User', email: 'test@test.com' }).returning('id');
        todo_id = todo[0];
        user_id = user[0]; 
        console.log('Todo ID:', todo[0], 'User ID:', user[0]);
    })  

    afterAll(async () => {
        await db.destroy();
    });
    
    test('POST /tasks should create a new task', async () => {
        const newTask = { user_id, todo_id};
        const response = await request(app).post('/tasks').send(newTask);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('data');
    });

    test('DELETE /tasks should delete a task', async () => {
        const task = { user_id, todo_id};
        const response = await request(app).delete(`/tasks`).send(task);;
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
})