
const express = require('express');
const router = express.Router();
const controllerUser = require('../controller/user');

// התחברות
router.post("/login", controllerUser.login);

// התחברות או הרשמה (חדש!)
router.post("/loginOrRegister", controllerUser.loginOrRegister);

// קבלת כל המשתמשים
router.get("/", controllerUser.get);

// לפי מזהה
router.get("/:id", controllerUser.getById);

// הרשמה
router.post("/", controllerUser.post);

module.exports = router;
