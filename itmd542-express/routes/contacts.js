var express = require("express");
var { body, validationResult } = require("express-validator");
var router = express.Router();

const repo = require("../src/repository");

/* GET list of contacts. */
router.get("/", function (req, res, next) {
  const data = repo.findAll();

  res.render("contacts", { title: "List of the contacts", contacts: data });
});

/* GET form to add a contact. */
router.get("/add", function (req, res, next) {
  res.render("contacts_input", { title: "Add a new contact" });
});

/* POST form to add a contact. */
router.post("/add",
  body("firstname").trim(),
  body("lastname").trim(),
  body("email").trim(),
  body("notes").trim(),
  function (req, res, next) {
    repo.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      notes: req.body.notes,
    });
    res.redirect("/contacts");
  }
);

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

/* GET contact delete */
router.get("/:uuid/delete", function (req, res, next) {
  repo.deleteById(req.params.uuid);
  res.redirect("/contacts");
});

/* GET contact edit */
router.get("/:uuid/edit", function (req, res, next) {
  const contact = repo.findById(req.params.uuid);

  res.render("contacts_input", {
    title: `Edit ${contact.firstname} ${contact.lastname}`,
    contact: contact,
  });
});

/* POST contact edit */
router.post("/:uuid/edit",
  body("firstname").trim(),
  body("lastname").trim(),
  body("email").trim(),
  body("notes").trim(),
  function (req, res, next) {
  const updatedContact = {
    id: req.params.uuid,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    notes: req.body.notes,
    date: new Date(),
  };

  repo.update(updatedContact);
  res.redirect("/contacts");
});

module.exports = router;
