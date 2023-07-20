import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { router as todoRouter } from "./routes/todos.js";
dotenv.config();

const app = express();
app.use(express.json());

// Middleware to check the origin against the regex pattern
const corsTrialRegex = /^https:\/\/trial\.apim\.trial-(.+)\.gravitee\.xyz\//;
const corsDevRegex = /^https:\/\/(.+)\.gravitee\.dev\//;
function customCorsOrigin(origin, callback) {
  if (!origin || corsTrialRegex.test(origin) || corsDevRegex.test(origin)) {
    // Allow the request since it matches the regex pattern or is a same-origin request
    callback(null, true);
  } else {
    // Disallow the request
    callback(new Error("Origin not allowed"));
  }
}
const corsOptions = {
  origin: customCorsOrigin,
};

app.use(cors(corsOptions));
app.set("port", process.env.PORT || 3001);

// This will be the default option in Mongoose 7. This ensures non-existent query filters are not stripped out
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Connected to database"))
  .catch(console.error);

app.use("/todos", todoRouter);

app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});
