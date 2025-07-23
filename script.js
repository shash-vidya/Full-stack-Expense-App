const form = document.getElementById('expense-form');
const list = document.getElementById('expense-list');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;

    await fetch('/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, amount, category })
    });

    form.reset();
    loadExpenses();
});

async function loadExpenses() {
    const res = await fetch('/expenses');
    const expenses = await res.json();

    list.innerHTML = '';
    expenses.forEach(exp => {
        const li = document.createElement('li');
        li.innerHTML = `${exp.description} - ${exp.amount} - ${exp.category} 
            <button onclick="deleteExpense(${exp.id})">Delete</button>
            <button onclick="editExpense(${exp.id}, '${exp.description}', ${exp.amount}, '${exp.category}')">Edit</button>`;
        list.appendChild(li);
    });
}

async function deleteExpense(id) {
    await fetch(`/expenses/${id}`, { method: 'DELETE' });
    loadExpenses();
}

async function editExpense(id, description, amount, category) {
    const newDescription = prompt('New Description', description);
    const newAmount = prompt('New Amount', amount);
    const newCategory = prompt('New Category', category);

    if (newDescription && newAmount && newCategory) {
        await fetch(`/expenses/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: newDescription, amount: parseFloat(newAmount), category: newCategory })
        });
        loadExpenses();
    }
}

loadExpenses();
