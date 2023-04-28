import express from "express";
import { producer } from "../kafka.js";
import { Todo } from "../models/todo.js";

const saveToKafka = async (action) => {
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
            action: action,
          }),
        },
      ],
    });
  } catch (err) {
    console.error("Error publishing message", err);
    await producer.disconnect();
  }
};

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

    saveToKafka("Created");

    res.json(todo);
  });

router
  .route("/:id")
  .delete(async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    saveToKafka("Deleted");
    res.json(result);
  })
  .patch(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    const { action } = req.query;

    if (action === "archive") {
      todo.archive = !todo.archive;
      saveToKafka("Archived");
    } else {
      todo.complete = !todo.complete;
      saveToKafka("Completed");
    }

    todo.save();

    res.json(todo);
  });
