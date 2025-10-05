const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Database connection (creates file if not exists)
const db = new sqlite3.Database('./cit.db', (err) => {
  if (err) console.error(err.message);
  console.log('Connected to SQLite database.');
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS students (
    student_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    course TEXT NOT NULL,
    department TEXT NOT NULL,
    branch TEXT NOT NULL,
    year TEXT NOT NULL,
    interests TEXT NOT NULL
)`);

// ===== CRUD Endpoints =====

// CREATE
app.post('/students', (req, res) => {
  const { name, email } = req.body; // <-- DESTRUCTURED (but not used)
  db.run(`INSERT INTO students (first_name, last_name, course, department, branch, year, interests ) VALUES (?, ?)`, // <-- ONLY 2 PLACEHOLDERS
    [first_name, last_name, course, department, branch, year, interests], // <-- 7 UNDEFINED VARIABLES
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, first_name, last_name, course, department, branch, year, interests });
    });
});

// READ all
app.get('/students', (req, res) => {
  db.all(`SELECT * FROM students`, [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

// READ one
app.get('/students/:student_id', (req, res) => {
  db.get(`SELECT * FROM students WHERE student_id = ?`, [req.params.student_id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(row);
  });
});

// UPDATE
app.put('/students/:student_id', (req, res) => {
  const { first_name, last_name } = req.body; // <-- DESTRUCTURED (but not used)
  db.run(`UPDATE students SET first_name = ?, last_name = ? WHERE student_id = ?`,
    [first_name, last_name, req.params.student_id], // <-- 2 UNDEFINED VARIABLES
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ updated: this.changes });
    });
});

// DELETE
app.delete('/students/:student_id', (req, res) => { // <-- uses :id
  db.run(`DELETE FROM students WHERE student_id = ?`, [req.params.student_id], function (err) { // <-- uses req.params.student_id
    if (err) return res.status(400).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
