const Expense = require('../models/Expense');
const { getDateRange } = require('../utils/dateFilters');

const createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    
    const expense = new Expense({
      userId: req.user._id,
      amount,
      category,
      description,
      date: date || Date.now()
    });

    await expense.save();

    res.status(201).json({
      message: 'Expense created successfully',
      expense: {
        id: expense._id,
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
        date: expense.date,
        userId: expense.userId
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { period, startDate, endDate, category } = req.query;

    let query = { userId: req.user._id };

    if (period) {
      try {
        const dateRange = getDateRange(period, startDate, endDate);
        if (dateRange) {
          query.date = {
            $gte: dateRange.start,
            $lte: dateRange.end
          };
        }
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }

    if (category) {
      query.category = category;
    }

    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Expense.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      expenses: expenses.map(expense => ({
        id: expense._id,
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
        date: expense.date,
        userId: expense.userId
      })),
      pagination: {
        total,
        page,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, description, date } = req.body;

    const expense = await Expense.findOne({ _id: id, userId: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.description = description || expense.description;
    expense.date = date || expense.date;

    await expense.save();

    res.json({
      message: 'Expense updated successfully',
      expense: {
        id: expense._id,
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
        date: expense.date,
        userId: expense.userId
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense
};