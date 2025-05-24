
exports.up = function(knex) {
    return knex.schema.createTable('tasks', function(table) {
        table.increments('id').primary();
        table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.integer('todo_id').notNullable().references('id').inTable('todos').onDelete('CASCADE');
        table.unique(['user_id', 'todo_id']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tasks');
};