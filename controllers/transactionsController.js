const express = require("express");
const transactions = express.Router();
const transactionsArray = require("../models/transactionModel.js");
const { nanoid } = require("nanoid");
const generateId = () => nanoid();

transactions.get("/", (req, res) => {
  res.json(transactionsArray);
});

// Create a new transaction
transactions.post('/', (req, res) => {
  const newTransaction = {
    id: generateId(),
    ...req.body
  };
  transactions.push(newTransaction);
  res.status(201).send(newTransaction);
});

// Update an existing transaction
transactions.put("/:id", (req, res) => {
    const { id } = req.params;
    const transactionIndex = transactions.findIndex(transaction => transaction.id === Number(id));

    if (transactionIndex === -1) {
        res.status(404).send({ error: `Transaction ${id} Not Found` });
    } else {
        transactions[transactionIndex] = { ...transactions[transactionIndex], ...req.body };
        res.status(200).send(transactions[transactionIndex]);
    }
  });

  // Delete a transaction by ID
transactions.delete("/:id", (req, res) => {
    const { id } = req.params;
    const transactionIndex = transactions.findIndex(transaction => transaction.id === Numbers(id));
    if (transactionIndex === -1) {
        res.status(404).send({ error: `Transaction ${id} Not Found` });
    } else {
        transactionsArray.splice(transactionIndex, 1);
        res.redirect("/transactions");
    }
  });

// Get all transactions
  transactions.get("/", (req, res) => {
    res.status(200).send(transactionsArray);
  });

// Get all household/common transactions
transactions.get("/household", (req, res) => {
    const householdTransactions = transactions.filter(transaction => transaction.transactionMemberID === 'Household');
    res.status(200).send(householdTransactions);
  });

// Get all transactions for a specific member
transactions.get("/member/:memberId", (req, res) => {
    const { memberId } = req.params;
    const memberTransactions = transactions.filter(transaction => transaction.transactionMemberId === Number(memberId));
    res.status(200).send(memberTransactions);
  });

module.exports = transactions;