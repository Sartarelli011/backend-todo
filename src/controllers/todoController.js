const Task = require("../models/Task");

const todoController = {
  getTask: async function (Request, Response) {
    try {
      const task = await Task.find();
      Response.status(200).send(task);
    } catch (error) {
      Response.status(400).send(error);
    }
  },
  addTask: async function (Request, Response) {
    const { userId } = Request.body;
    const task = new Task({
      task: Request.body.task,
      completed: false,
      userId: userId,
    });

    console.log("task:", task);
    try {
      const savedTask = await task.save();
      Response.status(200).send(savedTask);
    } catch (error) {
      Response.status(400).send(error);
    }
  },

  updateTask: async function (Request, Response) {
    try {
      const task = await Task.findByIdAndUpdate(
        { _id: Request.params.id },
        Request.body
      );
      Response.status(200).send(task);
    } catch (error) {
      Response.status(400).send(error);
    }
  },
  deleteTask: async function (Request, Response) {
    try {
      const task = await Task.findByIdAndDelete(Request.params.id);
      Response.status(200).send(task);
    } catch (error) {
      Response.status(400).send(error);
    }
  },
};

module.exports = todoController;
