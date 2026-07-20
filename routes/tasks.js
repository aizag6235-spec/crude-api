const express = require("express");

const router = express.Router();

let tasks = [
  {
    id: 1,
    title: "Buy milk",
    done: false,
  },
  {
    id: 2,
    title: "Finish homework",
    done: false,
  },
  {
    id: 3,
    title: "Walk the dog",
    done: true,
  },
];

let nextId = 4;

// GET all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// GET one task
router.get("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));

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

  const task = {
    id: nextId++,
    title,
    done: false,
  };

  tasks.push(task);

  res.status(201).json(task);
});

// PUT task
router.put("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  const { title, done } = req.body;

  if (title !== undefined) task.title = title;
  if (done !== undefined) task.done = done;

  res.json(task);
});

// DELETE task
router.delete("/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  tasks.splice(index, 1);

  res.json({
    message: "Task deleted",
  });
});

module.exports = router;
