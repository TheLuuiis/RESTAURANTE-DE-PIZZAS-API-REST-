const pool = require('../db/connection');

const getPizzas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM pizzas');
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching pizzas'});
    };
};

const createPizza = async (req, res) => {
    try {
        const {name, description, price} = req.body;
        const [result] = await pooñ.query(
            'INSERT INTO pizzas (name, description, price) VALUES (?, ?, ?)',
            [name, description, price]
        );
        res.json({ message: 'Pizza created', pizzaId: result.insertId });
    } catch (error) {   
        res.status(500).json({error: 'Error creating pizzas'});
    }
};



module.exports = { getPizzas, createPizza };