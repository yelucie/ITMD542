const path = require("node:path");
const betterSqlite3 = require("better-sqlite3");

const db = new betterSqlite3(path.join(__dirname, "../data/contacts.sqlite"));
const createDb = db.prepare(
  "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, email TEXT, notes TEXT, date TEXT)"
);
createDb.run();

const repo = {
  findAll: () => {
    return db.prepare("SELECT * FROM contacts").all();
  },
  findById: (uuid) => {
    return db.prepare("SELECT * FROM contacts WHERE id = ?").get(uuid);
  },

  create: (contact) => {
    db.prepare(
      "INSERT INTO contacts (firstname, lastname, email, notes, date) VALUES (?, ?, ?, ?, strftime('%Y-%m-%d %I:%M:%S %p', 'now', 'localtime'))"
    ).run(contact.firstname, contact.lastname, contact.email, contact.notes);
  },

  deleteById: (uuid) => {
    db.prepare("DELETE FROM contacts WHERE id = ?").run(uuid);
  },

  update: (updatedContact) => {
    db.prepare(
      "UPDATE contacts SET firstname = ?, lastname = ?, email = ?, notes = ?, date = strftime('%Y-%m-%d %I:%M:%S %p', 'now', 'localtime') WHERE id = ?"
    ).run(
      updatedContact.firstname,
      updatedContact.lastname,
      updatedContact.email,
      updatedContact.notes,
      updatedContact.id
    );
  },
};

module.exports = repo;
