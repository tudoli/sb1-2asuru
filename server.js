const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
const lessonsRouter = require('./routes/lessons');
app.use('/api', lessonsRouter);

// Database initialization
const db = require('./config/database');

// Initialize database tables
async function initDb() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS lessons (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        study_date DATE NOT NULL,
        completed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database tables initialized');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

initDb();

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});