
// const express = require('express');
//  const router = express.Router();
//  const multer = require('multer');
// const path = require('path');

//  const controllerProduct = require('../controller/product')
// router.get("/", controllerProduct.get);
// router.get("/:id", controllerProduct.getById);
// router.post("/", controllerProduct.post);
// router.put("/:id", controllerProduct.put);       
// router.delete("/:id", controllerProduct.delete); 

// module.exports = router;
const express = require('express');
const router = express.Router();
const controllerProduct = require('../controller/product');
const upload = require('../controller/upload'); 

// שליפות
router.get("/", controllerProduct.get);
router.get("/:id", controllerProduct.getById);

// הוספה עם קובץ
router.post("/", upload.single('image'), controllerProduct.post);

// עדכון רגיל
router.put("/:id", controllerProduct.put);

// מחיקה
router.delete("/:id", controllerProduct.delete);

module.exports = router;
