const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    desc: {
      type: String,
      required: [true, "Please add a description"],
    },
    value: {
      type: Number,
      validate: {
        validator: function (value) {
          if (value === 0) return false;
        },
        message: () => "Please add a positive or negative number",
      },
      required: [true, "Please add a positive or negative number"],
    },
    expenseDate: {
      type: Date,
      required: [true, "Please add a date"],
    },
  },
  {
    timestamps: true,
  }
);

expenseSchema.methods.isAuthorized = async function (id) {
  return this.userId.equals(id);
};

module.exports = mongoose.model("Expense", expenseSchema);
