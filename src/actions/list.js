const { render } = require('../core/view');
const { list } = require('../services/contacts');

const tpl = (contact) => `
<tr>
<td>${contact.id}</td>
<td>${contact.name}</td>
<td>${contact.email}</td>

<td>
<a href="/update?id=${contact.id}">Update</a>
<a href="/remove?id=${contact.id}">Remove</a>
</td>
</tr>
`;

module.exports = async (request, response, query) => {

  const contacts = await list();
  const listItems = contacts.length > 0
  ? contacts.map(tpl).join('\n')
    : `<tr><td colspan="4">No contacts avaliable</td></tr>`;

    

  return await render('contacts', {
    list: listItems
  })
}