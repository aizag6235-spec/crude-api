const express = require("express");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(express.json());

app.use("/tasks", taskRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
