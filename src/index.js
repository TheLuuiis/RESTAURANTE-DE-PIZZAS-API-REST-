const express = require('express');
const cors = requiere('cors');
const morgan = require('morgan');
require('dotenv').config();

const userRoutes = requiere('./routes/users');
const pizzasRoutes = require('./routes/pizzas');
const orderRoutes = require('./routes/orders');


const app = express();

app.use(cors());
app.use(morgan('dev'));;
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/pizzas', pizzasRoutes);
app.use('/api/orders', ordersRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ error: 'Internal server error'});
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
});