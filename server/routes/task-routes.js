const tasks = require('../database/task-queries.js');
const formatResponse = require('../utils/formatResponse.js');

async function post(req, res) {
    const { user_id, todo_id } = req.body;
  const result = await tasks.create(user_id, todo_id);
  return formatResponse(res, result);
}

async function del(req, res) {
  const { user_id, todo_id } = req.body;
  const result = await tasks.del(user_id, todo_id);
  return formatResponse(res, result);
}

module.exports = {
  post,
  del
};
