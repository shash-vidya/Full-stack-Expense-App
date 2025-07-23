const Expense = require('../models/expense');

exports.addExpense = async (req, res) => {
    try {
        const { description, amount, category } = req.body;
        const expense = await Expense.create({ description, amount, category });
        res.status(201).json(expense);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add expense' });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve expenses' });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Expense.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: 'Expense deleted successfully' });
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete expense' });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, amount, category } = req.body;
        const [updated] = await Expense.update(
            { description, amount, category },
            { where: { id } }
        );
        if (updated) {
            res.json({ message: 'Expense updated successfully' });
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update expense' });
    }
};
