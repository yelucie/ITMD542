const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const db = new Map();

const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/contacts.json'));
    const array = JSON.parse(jsonData);
    array.forEach((element) => {
        db.set(element[0], element[1]);
    });
};

const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
};

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),

    create: (contact) => {
        const newContact = {
            id: crypto.randomUUID(),
            firstname: contact.firstname,
            lastname: contact.lastname,
            email: contact.email,
            notes: contact.notes,
            date: new Date()
        };
        db.set(newContact.id, newContact);
        saveData();
    },

    deleteById: (uuid) => {
        db.delete(uuid);
        saveData();
    },

    update: (updatedContact) => {
        db.set(updatedContact.id, updatedContact);
        saveData();
    },

};

loadData();

module.exports = repo;