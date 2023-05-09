import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import UserRoute from "./routes/user-route.js";
import ProductRoute from "./routes/product-route.js";
import PurchaseRoute from "./routes/purchase-route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT;
const dburi = process.env.MONGODB_URI;

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
// app.use("/", UserRoute);

app.use("/api/users", UserRoute);
app.use("/api/products", ProductRoute);
app.use("/api/purchases", PurchaseRoute);

// DB connection
mongoose
  .connect(dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    // Listen
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection error: ", error);
  });