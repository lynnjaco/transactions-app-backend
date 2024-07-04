const express = require("express");
const transactions = express.Router();
const transactionsArray = require("../models/transactionModel.js");

transactions.get("/", (req, res) => {
  res.json(transactionsArray);
});

module.exports = members;