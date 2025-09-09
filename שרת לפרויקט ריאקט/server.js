
const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const user = require('./router/user');
 const product = require('./router/product');
 const order = require('./router/order');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// לוג על כל בקשה
app.use((req, res, next) => {
  console.log("Request:", req.url);
  next();
});

// סטטי לתמונות
app.use('/image', express.static(path.join(__dirname, 'image')));
 app.use("/product", product);
 app.use("/order", order);
 app.use("/user", user);
app.get('/', (req, res) => {
  res.send("hello world");
});

app.get('/person', (req, res) => {
  res.send("hello world person");
});

// לוג לקובץ
app.use((req, res, next) => {
  const text = new Date().toGMTString() + "  : " + req.url + '\n';
  fs.appendFile("log.txt", text, () => {
    next();
  });
});

// דף 404
app.use((req, res) => {
  fs.readFile("404.html", 'utf-8', (err, data) => {
    res.status(404).send(data || "404 not found");
  });
});
app.listen(4000, () => {
  console.log("Listening on port 4000");
});

app.use(express.json());
app.use('/image', express.static('image'));
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import TryGlassesRouter from './controller/TryGlasses.js'; 



// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // תומך בנתיב יחסי לתקיית הקבצים המועלים
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // 👓 הוספת ראוטר למשקפיים
// app.use(TryGlassesRouter); // ← מייבא את הנתיב /api/merge-glasses

// // הפעלת השרת
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });
