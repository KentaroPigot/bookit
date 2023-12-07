const express = require("express");
const proposalController = require("../controllers/proposalController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(proposalController.getAllProposals)
  .post(proposalController.createProposal);

module.exports = router;
