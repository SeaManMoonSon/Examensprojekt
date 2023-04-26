import mongoose from 'mongoose';
import express from 'express';
// import session from 'express-session';
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

import userRoute from './routes/user-route.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT;
const dburi = process.env.MONGODB_URI;

app.set('view engine', 'ejs');

// app.use(session({
//     secret: process.env.SESSION_SECRET || "secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 3000000}
// }));

app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(userRoute);

app.use((req, res, next) => {
    res.status(404).send("Sry - nothing to display");
    next();
});

app.use((err, req, res, next) => {
    
    console.error(err); 

    res.status(500).send("Server error - please return later");
    next();
});

mongoose
  .connect(dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(dburi);
    console.error("Database connection error: ", err);
  });