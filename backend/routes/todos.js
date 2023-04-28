import express from "express";
import { producer } from "../kafka.js";
import { Todo } from "../models/todo.js";

export const router = express.Router();
router
  .route("/")
  .get(async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
  })
  .post(async (req, res) => {
    const todo = new Todo({
      text: req.body.text,
    });

    todo.save();

    try {
      await producer.connect();
      const date = new Date();
      await producer.send({
        topic: "todo-created",
        messages: [
          { value: JSON.stringify({ datetime: date, action: "Todo Created" }) },
        ],
      });
    } catch (err) {
      console.error("Error publishing message", err);
      await producer.disconnect();
    }

    res.json(todo);
  });

router
  .route("/:id")
  .delete(async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
  })
  .patch(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    const { action } = req.query;

    if (action === "archive") {
      todo.archive = !todo.archive;
    } else {
      todo.complete = !todo.complete;
    }

    todo.save();

    res.json(todo);
  });
