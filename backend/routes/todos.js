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

      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString(undefined, {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        millisecond: "numeric",
      });

      await producer.send({
        topic: "todo-actions",
        messages: [
          {
            value: JSON.stringify({
              date: formattedDate,
              time: formattedTime,
              action: "Created",
            }),
          },
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
