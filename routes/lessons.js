const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all lessons for a student
router.get('/students/:studentId/lessons', async (req, res) => {
  try {
    const [lessons] = await db.query(
      'SELECT * FROM lessons WHERE student_id = ?',
      [req.params.studentId]
    );
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Record a new lesson
router.post('/lessons', async (req, res) => {
  const { student_id, study_date, completed } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO lessons (student_id, study_date, completed) VALUES (?, ?, ?)',
      [student_id, study_date, completed]
    );
    res.status(201).json({ id: result.insertId, message: 'Lesson recorded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update lesson status
router.put('/lessons/:id', async (req, res) => {
  const { completed } = req.body;
  try {
    await db.query(
      'UPDATE lessons SET completed = ? WHERE id = ?',
      [completed, req.params.id]
    );
    res.json({ message: 'Lesson updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;