const { nanoid } = require("nanoid");
const express = require("express");
const transactions = express.Router();
const transactionsArray = require("../models/transactionModel.js");

transactions.get("/", (req, res) => {
    res.json(transactionsArray);
});

// Create a new transaction
transactions.post("/", (req, res) => {
    const newTransaction = {
        id: `TN${nanoid(4)}}`, 
        ...req.body
    };
    transactionsArray.push(newTransaction);
    res.status(201).send(newTransaction);
});

// Get all transactions for a specific member
transactions.get("/member/:memberId", (req, res) => {
    const { memberId } = req.params;
    const transactionIndex = transactionsArray.find(transaction => transaction.transactionMemberID === memberId);
    const memberTransactions = transactionsArray.filter(transaction => transaction.transactionMemberID === memberId);
    if (!transactionIndex) {
        res.status(404).send({ error: `Transaction ${memberId} Not Found` });
    } else {
        res.status(200).send(memberTransactions);
    }
});

// Get all household/common transactions
transactions.get("/household", (req, res) => {
    const householdTransactions = transactionsArray.filter(transaction => transaction.transactionMemberID === 'MN1');
    res.status(200).send(householdTransactions);
});


// Update an existing transaction
transactions.put("/:id", (req, res) => {
    const { id } = req.params;
    const transactionIndex = transactionsArray.findIndex(transaction => transaction.id === id);
    
    if (transactionIndex === -1) {
        res.status(404).send({ error: `Transaction ${id} Not Found` });
    } else {
        transactionsArray[transactionIndex] = { ...transactionsArray[transactionIndex], ...req.body };
        res.status(200).send(transactionsArray[transactionIndex]);
    }
});

  // Delete a transaction by ID
transactions.delete("/:id", (req, res) => {
    const { id } = req.params;
    const transactionIndex = transactionsArray.findIndex(transaction => transaction.id === id);
    if (transactionIndex === -1) {
        res.status(404).send({ error: `Transaction ${id} Not Found` });
    } else {
        transactionsArray.splice(transactionIndex, 1);
        res.redirect("/transactions");
    }
});

// Get all transactions
transactions.get("/", (req, res) => {
    console.log("Index Route");
    res.status(200).send(transactionsArray);
});

// Get a specific transaction
transactions.get("/:id", (req, res) => {
    const { id } = req.params;
    const transaction = transactionsArray.find(el => el.id === id);
    console.log("Success")
    if (transaction) {
      res.status(200).send(transaction)
    } else {
      res.status(404).send({error: `Transaction with ID: ${id} Not Found`})
    }
  })

module.exports = transactions;