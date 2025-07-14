const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Expense Tracker API is running' });
});

// Debug route to check if auth routes are loaded
app.get('/debug/routes', (req, res) => {
  res.json({
    message: 'Routes loaded',
    routes: [
      'GET /health',
      'POST /auth/register',
      'POST /auth/login',
      'GET /expenses',
      'POST /expenses',
      'PUT /expenses/:id',
      'DELETE /expenses/:id',
    ],
  });
});

app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
