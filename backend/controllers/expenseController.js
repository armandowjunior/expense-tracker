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
      res.status(201).json(expense);
    }
  } catch (error) {
    next(error);
  }
};

//@desc get expenses from userId
//@route GET /api/expenses
//@access PRIVATE

const getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({
      expenseDate: -1,
    });

    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};

//@desc get expenses from userId and query for specific year and month;
//@route GET /api/expensesfilter
//@access PRIVATE

const getExpensesFiltered = async (req, res, next) => {
  try {
    const { year, month } = req.query;

    const firstDay = new Date(Date.UTC(year, month, 1)).toISOString();
    const lastDay = new Date(
      Date.UTC(year, parseInt(month) + 1, 0, 23, 59, 59)
    ).toISOString();

    const expenses = await Expense.find({
      userId: req.user._id,
      expenseDate: {
        $gte: firstDay,
        $lte: lastDay,
      },
    }).sort({
      expenseDate: -1,
    });

    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};

//@desc get all the years of the transactions;
//@route GET /api/expensesyears
//@access PRIVATE

const getExpensesYears = async (req, res, next) => {
  try {
    const years = await Expense.aggregate([
      {
        $match: {
          userId: req.user._id,
        },
      },
      {
        $project: {
          _id: 0,
          year: { $year: "$expenseDate" },
        },
      },
      {
        $group: {
          _id: 0,
          uniqueValues: { $addToSet: "$year" },
        },
      },
      { $unwind: "$uniqueValues" },
      { $sort: { uniqueValues: -1 } },
      { $group: { _id: null, years: { $push: "$uniqueValues" } } },
    ]);

    const yearsValue = years[0]?.years ? years[0].years : [];

    res.status(200).json(yearsValue);
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
  getExpensesFiltered,
  getExpensesYears,
  deleteExpense,
};
