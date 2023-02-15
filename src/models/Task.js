const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true },
});
module.exports = mongoose.model("Task", taskSchema);
