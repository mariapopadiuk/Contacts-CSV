const http = require('http');
const moment = require('moment');
const { add, run } = require('./router')

const handleRequest = async(request, response) => {

  console.log(`[${request.method}] ${moment().format('YYYY-MM-DD HH:mm:ss')} ${request.url}`);

  try{
    const content = await run(request, response);
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    return response.end(content);

  } catch (err) {
    response.writeHead(404,{
      'Content-Type': 'text/html'
    });

    return response.end(`<h1>${err.message}</h1>`)
  }
};

const server = http.createServer(handleRequest)

module.exports = {
  server,
  add
};