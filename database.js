const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "tasks.db");
console.log("Using database:", dbPath);

const db = new Database(dbPath);

db.prepare(
  `
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL
)
`,
).run();

const count = db.prepare("SELECT COUNT(*) AS count FROM tasks").get();

if (count.count === 0) {
  const insert = db.prepare("INSERT INTO tasks (title, done) VALUES (?, ?)");

  insert.run("Buy milk", 0);
  insert.run("Finish homework", 0);
  insert.run("Walk the dog", 1);
}

module.exports = db;
