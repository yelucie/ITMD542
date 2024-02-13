var express = require("express");
var { body, validationRes } = require("express-validator");
var router = express.Router();

const repo = require("../src/repository");

/* GET list of contacts. */
router.get("/", function (req, res, next) {
  const data = repo.findAll();

  res.render("contacts", { title: "List of the contacts", contacts: data });
});

/* GET form to add a contact. */
router.get("/add", function (req, res, next) {
  res.render("contacts_add", { title: "Add a new contact" });
});

/* POST form to add a contact. */
router.post("/add", function (req, res, next) {
  repo.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    notes: req.body.notes
  })
  res.redirect('/contacts');
});

/* GET a single contact. */
router.get("/:uuid", function (req, res, next) {
  const contact = repo.findById(req.params.uuid);

  if (contact) {
    res.render("contact", {
      title: `${contact.firstname} ${contact.lastname}`,
      contact: contact,
    });
  }
});

/* POST todos delete */
router.get('/:uuid/delete', function(req, res, next) {
  repo.deleteById(req.params.uuid);
  res.redirect('/contacts');
});

module.exports = router;
