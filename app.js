const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

const membersController = require("./controllers/membersController");
app.use("/members", membersController);

const transactionsController = require("./controllers/transactionsController");
app.use("/transactions", transactionsController);

module.exports = app;