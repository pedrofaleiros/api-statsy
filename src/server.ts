import "express-async-errors"
import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import { errorHandler } from "./error/errorHandler";

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler());

app.listen(PORT, () => {
  console.clear();
  console.log("Server listening at " + PORT);
});
