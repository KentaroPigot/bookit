const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const proposalRouter = require("../routes/proposalRoutes");

router.use("/:bookId/proposals", proposalRouter);

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

router
  .route("/:bookId")
  .get(bookController.getBook)
  .delete(bookController.deleteBook);

module.exports = router;
