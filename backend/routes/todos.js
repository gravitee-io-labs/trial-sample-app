import express from "express";
import { kafka } from "../kafka.js";
import { Todo } from "../models/todo.js";

const producer = kafka.producer();

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
      await producer.send({
        topic: "test-topic",
        messages: [{ value: "Hello KafkaJS user!" }],
      });
      console.log("Published message");
      await producer.disconnect();
    } catch (err) {
      console.error("Error publishing message", err);
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
