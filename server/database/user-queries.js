const knex = require("./connection.js");

async function all() {
    try {
        const users = await knex('users');
        return {
            statusCode: 200,
            message: 'Users retrieved successfully',
            data: users || []
        }
    } catch (error) {
        console.error('Error fetching all users:', error);
        return {
            statusCode: 500,
            message: 'Error fetching all users',
            error: error.message
        }
    }
}

async function get(id) {
    try {
        const user = await knex('users').where({ id }).first().returning('*');
        if(!user) {
            return {
                statusCode: 404,
                message: 'User not found',
                data: null
            };
        }
        return {
            statusCode: 200,
            message: 'User retrieved successfully',
            data: user
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return {
            statusCode: 500,
            message: 'Error fetching user',
            error: error.message
        }
    }
}

async function create(name, email) {
    if(!name || !email) {
        return {
            statusCode: 400,
            message: 'Name and email are required',
            data: null
        }
    }

    try {
        const user = await knex('users').insert({ name, email }).returning('*');
        return {
            statusCode: 201,
            message: 'User created successfully',
            data: user[0]
        }
    } catch (error) {
        if(error.code === '23505') {
            return {
                statusCode: 409,
                message: 'Email already exists',
                data: null
            }
        }
        console.error('Create user failed: ', error);
        return {
            statusCode: 500,
            message: 'Create user failed',
            error: error.message
        }
    }
}

async function update({id, name, email}) {
    if(!id || !name || !email) {
        return {
            statusCode: 400,
            message: 'ID and name and email are required',
            data: null
        }
    }
    const [user] = await knex('users').where({ id }).update({ name, email }).returning('*');

    if(!user) {
        return {
            statusCode: 404,
            message: 'User not found',
            data: null
        }
    }

    return {
        statusCode: 200,
        message: 'User updated successfully',
        data: user
    }
}

// delete is a reserved keyword
async function del(id) {
    try {
        const [user] = await knex('users').where({ id }).del().returning('*');
        
        if(!user) {
            return {
                statusCode: 404,
                message: 'User not found',
                data: null
            }
        }
        return {
            statusCode: 200,
            message: 'User deleted successfully',
            data: user
        }
    } catch (error) {   
        console.error('Delete user error: ', error);
        return {
            statusCode: 500,
            message: 'Delete user failed',
            error: error.message
        }
    }
}

async function clear() {
    return knex('users').del().returning('*');
}

module.exports = {
    all,
    get,
    create,
    update,
    del,
    clear
}