const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const expenseRoutes = require('./routes/expenseRoutes');
const Expense = require('./models/expense');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(expenseRoutes);

sequelize.sync().then(() => {
    console.log('Database synced');
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
}).catch(err => console.error('Database sync error:', err));
