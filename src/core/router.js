const { request } = require('http'); 
const { parse } = require('url');

const routes = {}

const add = (path, callback) => {
  return routes[path] = callback
};

const run = async (request ,response) => {
  const parseUrl = parse(request.url, true);
  const route = parseUrl.pathname;

  if(!routes[route]) {
    throw new Error('404 Not Founded')
  }

  return await routes[route](request, response, parseUrl.query);
};

module.exports = {
  add,
  run
};