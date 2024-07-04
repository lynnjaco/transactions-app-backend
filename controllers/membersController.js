const express = require("express");
const members = express.Router();
const membersArray = require("../models/memberModel.js");

members.get("/", (req, res) => {
  res.json(membersArray);
});

module.exports = members;