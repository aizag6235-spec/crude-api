const express = require("express");

const router = express.Router();

const db = require("../database");

// GET all tasks
router.get("/", (req, res) => {
  const tasks = db.prepare("SELECT * FROM tasks").all();

  res.json(tasks);
});

// GET one task
router.get("/:id", (req, res) => {
  const task = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(req.params.id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  res.json(task);
});

// POST task
router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "Title is required",
    });
  }

  const result = db
    .prepare("INSERT INTO tasks (title, done) VALUES (?, ?)")
    .run(title, 0);

  const task = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json(task);
});

// PUT task
router.put("/:id", (req, res) => {
  const task = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(req.params.id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  const title = req.body.title ?? task.title;
  const done = req.body.done ?? task.done;

  db.prepare("UPDATE tasks SET title = ?, done = ? WHERE id = ?").run(
    title,
    done,
    req.params.id,
  );

  const updatedTask = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(req.params.id);

  res.json(updatedTask);
});

// DELETE task
router.delete("/:id", (req, res) => {
  const task = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(req.params.id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  db.prepare("DELETE FROM tasks WHERE id = ?").run(req.params.id);

  res.json({
    message: "Task deleted",
  });
});

module.exports = router;
