// Initialize the expense-tracker database
db = db.getSiblingDB('expense-tracker');

// Create a user for the expense-tracker database
db.createUser({
  user: 'expense-user',
  pwd: 'expense-password',
  roles: [
    {
      role: 'readWrite',
      db: 'expense-tracker'
    }
  ]
});

// Create collections with indexes
db.createCollection('users');
db.createCollection('expenses');

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.expenses.createIndex({ userId: 1, date: -1 });
db.expenses.createIndex({ userId: 1, category: 1 });

print('Database initialization completed!');