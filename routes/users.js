const router = require("express").Router();
let Username = require("../models/user.model");

router.route("/").get((req, res) => {
  Username.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("error" + err));
});

// handles POST request
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newUser = new Username({
    username,
    password,
  });

  // new user saved to databse with save()
  // after save, then return
  newUser
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(400).json("error" + err));
});

router.route("/:id").get((req, res) => {
  Username.findById(req.params.id)
    .then((username) => res.json(username))
    .catch((err) => res.status(400).json(err + "err"));
});

// handle DELETE
router.route("/:id").delete((req, res) => {
  Username.findByIdAndDelete(req.params.id)
    .then(() => res.json("Username deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
