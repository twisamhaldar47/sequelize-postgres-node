const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");

//fetching data
router.get("/", (req, res) => {
  Gig.findAll()
    .then(gigs => {
      res.render("gigs", {
        gigs
      });
    })
    .catch(err => console.log(err));
});

//display add form
router.get("/add", (req, res) => {
  res.render("add");
});

//adding data
router.post("/add", (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  //validation
  let errors = [];
  if (!title) {
    errors.push({ text: "Please add a title" });
  }
  if (!technologies) {
    errors.push({ text: "Please add some technologies" });
  }
  if (!description) {
    errors.push({ text: "Please add a description" });
  }
  if (!contact_email) {
    errors.push({ text: "Please add a contact_email" });
  }

  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      description,
      contact_email,
      budget
    });
  } else {
    Gig.create({
      title,
      technologies,
      budget,
      description,
      contact_email
    })
      .then(gig => res.redirect("/gigs"))
      .catch(err => console.log(err));
  }
});

module.exports = router;
