const app = require('./server-config.js');
const todoRoutes = require('./routes/todo-routes.js');
const userRoutes = require('./routes/user-routes.js');
const taskRoutes = require('./routes/task-routes.js');

const port = process.env.PORT || 5000;

// USER routes
app.get('/users', userRoutes.getAll);
app.get('/users/:id', userRoutes.get);
app.post('/users', userRoutes.post);
app.patch('/users/:id', userRoutes.patch);
app.delete('/:id', userRoutes.del);

// TASK routes
app.post('/tasks', taskRoutes.post);
app.delete('/tasks', taskRoutes.del);

// TODO routes
app.get('/', todoRoutes.getAllTodos);
app.get('/:id', todoRoutes.getTodo);

app.post('/', todoRoutes.postTodo);
app.patch('/:id', todoRoutes.patchTodo);

app.delete('/', todoRoutes.deleteAllTodos);
app.delete('/:id', todoRoutes.deleteTodo);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;