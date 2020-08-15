const router = require("express").Router();
let Bill = require("../models/bill.model");

router.route("/").get((req, res) => {
  Bill.find()
    .then((bills) => res.json(bills))
    .catch((err) => res.status(400).json("error" + err));
});

// handles POST request
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const billname = req.body.billname;
  const billamount = Number(req.body.billamount);
  const date = Date.parse(req.body.date);
  // create new instance of user
  const newBill = new Bill({
    username,
    billname,
    billamount,
    date,
  });

  // new user saved to databse with save()
  newBill
    .save()
    .then(() => res.json("Bill added"))
    .catch((err) => res.status(400).json("error" + err));
});

router.route("/:id").get((req, res) => {
  Bill.findById(req.params.id)
    .then((bill) => res.json(bill))
    .catch((err) => res.status(400).json(err + "err"));
});

// handle DELETE
router.route("/:id").delete((req, res) => {
  Bill.findByIdAndDelete(req.params.id)
    .then(() => res.json("Bill deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
