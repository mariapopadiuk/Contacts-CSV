const { server, add } = require('./core/server')
const listAction = require('./actions/list');
const saveAction = require('./actions/save');

const port = parseInt(process.argv[2]) || 3000;

add('/', listAction);
add('/save', saveAction);


server.listen(port);
console.log(`Server listening on port ${port}: http://localhost:${port}`);