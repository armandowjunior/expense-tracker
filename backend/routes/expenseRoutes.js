const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/expenseController");

router.route("/").post(protect, createExpense).get(protect, getExpenses);
router.route("/:id").delete(protect, deleteExpense);

module.exports = router;
