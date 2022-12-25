const {
  addContact,
  listContacts,
  getContactById,
  removeContact,
} = require("./contacts.js");

// index.js
// const argv = require("yargs").argv;

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        //   console.log("invoke list");
        const contacts = await listContacts();
        console.table(contacts);
        break;

      case "get":
        const сontact = await getContactById(id);
        if (сontact === undefined) {
          console.log(`no contact by id ${id}`);
          return;
        }
        console.log("Your contact is find");
        console.table(contact);
        break;

      case "add":
        const newContact = await addContact(name, email, phone);
        console.log("Add new contact");
        console.table(newContact);
        //   console.table("invoke add", name, email, phone);
        //   await addContact(name, email, phone);
        break;

      case "remove":
        //   console.log("invoke remove");
        const remContact = await removeContact(id);
        if (remContact === undefined) {
          console.log(`no contact by id ${id}`);
          return;
        }
        console.log(`Contact with id: ${id} was deleted`);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error(error.message);
  }
}

invokeAction(argv);
// listContacts();
// getContactById();
// removeContact();
// addContact();
