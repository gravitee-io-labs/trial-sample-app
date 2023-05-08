import express from "express";
import { Todo } from "../models/todo.js";

// const saveToKafka = async (action) => {
//   try {
//     await producer.connect();

//     const now = new Date();~
//     const formattedDate = now.toLocaleDateString();
//     const formattedTime = now.toLocaleTimeString(undefined, {
//       hour12: false,
//       hour: "numeric",
//       minute: "numeric",
//       second: "numeric",
//       millisecond: "numeric",
//     });

//     await producer.send({
//       topic: "root-todo-actions",
//       messages: [
//         {
//           value: JSON.stringify({
//             date: formattedDate,
//             time: formattedTime,
//             action: action,
//           }),
//         },
//       ],
//     });
//   } catch (err) {
//     console.error("Error publishing message", err);
//     await producer.disconnect();
//   }
// };

export const router = express.Router();
router
  .route("/")
  .get(async (req, res) => {
    const userId = req.headers["user-id"];
    const todos = await Todo.find({ userId });

    res.json(todos);
  })
  .post(async (req, res) => {
    const todo = new Todo({
      userId: req.headers["user-id"],
      text: req.body.text,
    });

    todo.save();

    res.json(todo);
  });
// .delete(async (req, res) => {
//   try {
//     await admin.connect();
//     await admin.deleteTopics({
//       topics: ["root-todo-actions"],
//       timeout: 5000,
//     });
//   } catch (err) {
//     console.error("Error deleting topic", err);
//     await admin.disconnect();
//   }
//   res.json("topic deleted");
// });

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
