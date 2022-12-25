const fs = require("fs/promises");
// const { resolve, parse } = require("path");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "db/contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const contact = await getContactById(contactId);
  const contacts = await listContacts();
  const newContactList = contacts.filter((item) => item.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2));
  return contact;
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contacts = await listContacts();
  const newContact = { id, name, email, phone };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  addContact,
  listContacts,
  getContactById,
  removeContact,
};
