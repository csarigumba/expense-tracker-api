const express = require('express');
const { createExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController');
const authenticateToken = require('../middleware/auth');
const { validateExpense, validateExpenseUpdate } = require('../middleware/validation');

const router = express.Router();

router.use(authenticateToken);

router.post('/', validateExpense, createExpense);
router.get('/', getExpenses);
router.put('/:id', validateExpenseUpdate, updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;