const { URLSearchParams} = require('url');
const {save} = require('../services/contacts');

console.log(save);

module.exports = async (request, response, query) => {

if(!request.method === 'POST'){
  response.writeHead(405, 'Method not allowed')
  return response.end('Method not allowed');
}

const chunks = [];

request.on('data', chunk => chunks.push(chunk));
request.on('close', async () => {
  const data = Buffer.concat(chunks);
  const url = new URLSearchParams(data.toString());

  const name = url.get('name');
  const email = url.get('email');

 try{
   await save(name,email);
 }catch(err){
   response.writeHead(302, {Location: `/?message=${err.message}`});
   return response.end()
 }
})


 response.writeHead(302, {Location: '/'})
 return response.end();
}