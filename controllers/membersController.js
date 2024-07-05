const express = require("express");
const members = express.Router();
const membersArray = require("../models/memberModel.js");
members.get("/", (req, res) => {
  res.json(membersArray);
});

// Create a household member
members.post("/", (req, res) => {
  const newMember = {
    id: `MN${membersArray.length + 1}`,
    ...req.body
  };
  membersArray.push(newMember);
  res.status(201).send(newMember);
});

// Show a specific household member
members.get("/:id", (req, res) => {
  const { id } = req.params;
  const member = membersArray.find(el => el.id === id);
  if (member) {
    res.status(200).send(member)
  } else {
    res.status(404).json({error: `Member with ID: ${id} Not Found`})
  }
})

// Update a household member
members.put("/:id", (req, res) => {
    const { id } = req.params;
    const memberIndex = membersArray.findIndex(member => member.id === id);

    if (memberIndex === -1) {
        res.status(404).send({ error: `Member with ID: ${id} Not Found` });
    } else {
        membersArray[memberIndex] = { ...membersArray[memberIndex], ...req.body };
        res.status(200).send(membersArray[memberIndex]);
    }
});

// Delete a household member
members.delete("/:id", (req, res) => {
    const { id } = req.params;
    const memberIndex = membersArray.findIndex(member => member.id === id);
    if (memberIndex === -1) {
        res.status(404).send({ error: `Member with ID: ${id} Not Found` });
    } else {
        membersArray.splice(memberIndex, 1);
        res.redirect("/members");
    }
});

module.exports = members;