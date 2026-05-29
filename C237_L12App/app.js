// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Declare any necessary variables or in-memory data structures here
let expenses = [
    {
        id: 1,
        name: "Lunch",
        amount: 5.00,
        category: "Food",
        date: "2026-05-27"
    },
    {
        id: 2,
        name: "Bus Fare",
        amount: 2.00,
        category: "Transport",
        date: "2026-05-27"
    }
];

// TASK: Define appropriate routes below
// ---------------------------------------------------

// Define a route to render the index page
app.get('/', (req, res) => {
    res.render('index');
});

// Display Add Expense Page
app.get('/addExpense', (req, res) => {
    res.render('addExpense');
});

// Process Add Expense Form
app.post('/addExpense', (req, res) => {
    const newExpense = {
        id: expenses.length + 1,
        name: req.body.name,
        amount: req.body.amount,
        category: req.body.category,
        date: req.body.date
    };

    expenses.push(newExpense);
    res.redirect('/viewExpenses');
});

// Display View Expenses Page
app.get('/viewExpenses', (req, res) => {
    res.render('viewExpenses', { expenses: expenses });
});

// Display Edit Expense Page
app.get('/editExpense/:id', (req, res) => {
    const expense = expenses.find(item => item.id == req.params.id);
    res.render('editExpense', { expense: expense });
});

// Process Edit Expense Form
app.post('/editExpense/:id', (req, res) => {
    const expense = expenses.find(item => item.id == req.params.id);

    expense.name = req.body.name;
    expense.amount = req.body.amount;
    expense.category = req.body.category;
    expense.date = req.body.date;

    res.redirect('/viewExpenses');
});

// Delete Expense
app.get('/deleteExpense/:id', (req, res) => {
    expenses = expenses.filter(item => item.id != req.params.id);
    res.redirect('/viewExpenses');
});

// ---------------------------------------------------

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});