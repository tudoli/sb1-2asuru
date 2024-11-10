const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// Get all lessons for a student
router.get('/students/:studentId/lessons', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM lessons WHERE student_id = ? ORDER BY study_date DESC',
      [req.params.studentId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new lesson
router.post('/lessons', async (req, res) => {
  try {
    const { student_id, study_date, completed } = req.body;
    const [result] = await pool.query(
      'INSERT INTO lessons (student_id, study_date, completed) VALUES (?, ?, ?)',
      [student_id, study_date, completed]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update lesson status
router.put('/lessons/:id', async (req, res) => {
  try {
    const { completed } = req.body;
    await pool.query(
      'UPDATE lessons SET completed = ? WHERE id = ?',
      [completed, req.params.id]
    );
    res.json({ message: 'Lesson updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;