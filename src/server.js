const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initDatabase } = require('./config/database');
const lessonsRouter = require('./routes/lessons');
const studentsRouter = require('./routes/students');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', lessonsRouter);
app.use('/api', studentsRouter);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Student Lessons API' });
});

// Initialize database and start server
async function startServer() {
  try {
    await initDatabase();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();