# Student Lessons API

A Node.js REST API for tracking student lessons and study progress.

## Features

- Track student lessons and completion status
- MySQL database integration
- RESTful endpoints for managing lessons
- Environment-based configuration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create MySQL database:
```sql
CREATE DATABASE student_lessons;
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update database credentials in `.env`:
     ```
     DB_HOST=localhost
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_NAME=student_lessons
     PORT=3000
     ```

## API Endpoints

### Get Student Lessons
```
GET /api/students/:studentId/lessons
```

### Record New Lesson
```
POST /api/lessons
Content-Type: application/json

{
  "student_id": 1,
  "study_date": "2023-10-15",
  "completed": false
}
```

### Update Lesson Status
```
PUT /api/lessons/:id
Content-Type: application/json

{
  "completed": true
}
```

## Development

Start the development server:
```bash
npm run dev
```

## Production

Start the production server:
```bash
npm start
```