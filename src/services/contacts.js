
const {appendFile, readFile} = require('fs/promises')
const {join} = require('path');
const uuid = require('uuid');

const csv = join(__dirname, '..', '..','data','contacts.csv');

const save = async (name, email) => {
  const contacts = await list();
  if(contacts.find(c => c.email === email) === null){
    throw new Error('Error')
  }
  appendFile(csv, `${uuid.v4()},${name},${email}\n`) 
};

const list = async () => (await readFile(csv))
.toString()
.trim() 
.split(/\r?\n/)
.filter(line => line !== '')
.splice(2)
.map(line => {
  const [id,name,email] = line.split(',');
  return {id,name,email}
});

module.exports = {
  save,
  list
}