const users = require('../database/user-queries.js');
const formatResponse = require('../utils/formatResponse.js');

async function getAll(req, res) {
  const result = await users.all();
  return formatResponse(res, result);
}

async function get(req, res) {
  const result = await users.get(req.params.id);
  return formatResponse(res, result);
}

async function post(req, res) {
    const { name, email } = req.body;
  const result = await users.create(name, email);
  return formatResponse(res, result);
}

async function patch(req, res) {
    const { name, email } = req.body;
  const result = await users.update({id: req.params.id, name, email});
  return formatResponse(res, result);
}

async function del(req, res) {
  const result = await users.del(req.params.id);
  return formatResponse(res, result);
}

module.exports = {
  getAll,
  get,
  post,
  patch,
  del
};
