const Expense = require("../models/expenseModel");

//@desc create new expense
//@route POST /api/expenses
//@access PRIVATE

const createExpense = async (req, res, next) => {
  try {
    const { desc, value, expenseDate } = req.body;

    const expense = await Expense.create({
      userId: req.user._id,
      desc,
      value,
      expenseDate,
    });

    if (expense) {
      res.status(201).json({
        userId: req.user._id,
        desc,
        value,
        expenseDate,
      });
    }
  } catch (error) {
    next(error);
  }
};

//@desc get expenses from userId
//@route POST /api/expenses
//@access PRIVATE

const getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id });

    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};

//@desc delete expense from userId
//@route DELETE /api/expenses/:expenseId
//@access PRIVATE

const deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      res.status(400);
      throw new Error("Expense not found");
    }

    // Make a middleware to check for this if the check is used in multiple requests;
    if (!(await expense.isAuthorized(req.user._id))) {
      res.status(401);
      throw new Error("User not authorized");
    }

    await expense.remove();

    res
      .status(200)
      .json({ id: req.params.id, message: "Deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400);
      error.message = "Expense not found";
    }
    next(error);
  }
};

module.exports = {
  createExpense,
  getExpenses,
  deleteExpense,
};
