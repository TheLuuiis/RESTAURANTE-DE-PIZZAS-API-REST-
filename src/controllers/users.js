const pool = require('../db/connection');
const bcrypt = require('bcryptjs');


const registerUser = async (req, res) => {
    try {
        const {name, email, password, phone} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, phone]
        );

        res.json( {message: 'User registered successfully', userId: result.insertId} )

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error registering user'});
    };
};

module.exports = { registerUser };