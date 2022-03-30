const {readFile } = require('fs/promises');
const { join } = require('path');

const templatePath = (name) => join(__dirname, '..', '..', 'templates', name).concat('.html');

const render = async (file, data = {}) => {
  const filePath = templatePath(file);
  let content = (await readFile(filePath)).toString();

  Object.keys(data).forEach(k => {
    const templateKey = `{{ ${k} }}`; /////dupla chaveta {{}}???????
    const regex = new RegExp(templateKey, 'g');
    content = content.replace(regex, data[k]);
  });

  return content;
};

module.exports = {
  render
}