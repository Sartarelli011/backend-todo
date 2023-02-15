const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const auth = require("../controllers/authController");

router.get("/", auth, todoController.getTask);
router.post("/", auth, todoController.addTask);
router.put("/:id", auth, todoController.updateTask);
router.delete("/:id", auth, todoController.deleteTask);

module.exports = router;
