import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { router as todoRouter } from "./routes/todos.js";

const app = express();

app.use(express.json());
app.use(cors());
app.set("port", process.env.PORT || 3001);

// This will be the default option in Mongoose 7. This ensures non-existent query filters are not stripped out
mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://bigmike:${process.env.MONGODB_PW}@cluster0.2ogi8pf.mongodb.net/?retryWrites=true&w=majority`,
    {}
  )
  .then(() => console.log("Connected to database"))
  .catch(console.error);

app.use("/todos", todoRouter);

app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});
