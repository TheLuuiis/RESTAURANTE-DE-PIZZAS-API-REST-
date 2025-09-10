const pool = require('../db/connection');

const createOrder = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { customerName, address, phone, items } = req.body;

    await connection.beginTransaction();

    const [orderResult] = await connection.query(
      'INSERT INTO orders (customer_name, address, phone, total) VALUES (?, ?, ?, ?)',
      [customerName, address, phone, 0]
    );
    const orderId = orderResult.insertId;

    let total = 0;

    for (const item of items) {
      const [pizza] = await connection.query(
        'SELECT price FROM pizzas WHERE id = ?',
        [item.pizzaId]
      );

      if (pizza.length === 0) throw new Error('Pizza not found');

      const price = pizza[0].price * item.quantity;
      total += price;

      await connection.query(
        'INSERT INTO order_items (order_id, pizza_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.pizzaId, item.quantity, price]
      );
    }

    await connection.query('UPDATE orders SET total = ? WHERE id = ?', [total, orderId]);

    await connection.commit();

    res.json({ message: 'Order created', orderId });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ error: 'Error creating order' });
  } finally {
    connection.release();
  }
};

module.exports = { createOrder };
