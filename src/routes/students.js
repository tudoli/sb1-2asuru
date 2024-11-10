const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// Get all students
router.get('/students', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new student
router.post('/students', async (req, res) => {
  try {
    const { name } = req.body;
    const [result] = await pool.query(
      'INSERT INTO students (name) VALUES (?)',
      [name]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;