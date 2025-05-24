const knex = require("./connection.js");

async function create(user_id, todo_id) {
    if(!user_id || !todo_id) {
        return {
            statusCode: 400,
            message: 'user_id and todo_id are required',
            data: null
        }
    }

    try {
        const task = await knex('tasks').insert({ user_id, todo_id }).returning('*');
        return {
            statusCode: 201,
            message: 'task created successfully',
            data: task[0]
        }
    } catch (error) {
        if(error.code === '23505') {
            return {
                statusCode: 409,
                message: 'todo_id and user_id already exists',
                data: null
            }
        }
        console.error('Create task failed: ', error);
        return {
            statusCode: 500,
            message: 'Create task failed',
            error: error.message
        }
    }
}

// delete is a reserved keyword
async function del(user_id, todo_id) {
    try {
        const [task] = await knex('tasks').where({ user_id, todo_id }).delete().returning('*');
        if(!task) {
            return {
                statusCode: 404,
                message: 'task not found',
                data: null
            }
        }
        return {
            statusCode: 200,
            message: 'task deleted successfully',
            data: task
        }
    } catch (error) {   
        console.error('Delete task error: ', error);
        return {
            statusCode: 500,
            message: 'Delete task failed',
            error: error.message
        }
    }
}

async function clear() {
    return knex('tasks').del().returning('*');
}

module.exports = {
    create,
    delete: del,
    clear
}