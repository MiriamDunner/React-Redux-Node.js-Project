
// const fs = require('fs');

// function get(req, res) {
//     fs.readFile("products.json", "utf-8", (err, data) => {
//         if (err) {
//             res.status(500).send("error read file student ")
//         } else {
//             res.send(JSON.parse(data));
//         }

//     })
// }
// //אפשרות ראשונה ליצא פונקציה מדף
// exports.getById = (req, res) => {

//     fs.readFile("products.json", "utf-8", (err, data) => {
//         if (err) {
//             res.status(500).send("error read file student ")
//         } else {
//             let id = req.params.id;

//             data = JSON.parse(data);
//             let product = data.find(st => st.id == id)

//             if (product == undefined) {
//                 res.status(500).send("not found student by tz " + id);
//             } else {
//                 res.send(product);
//             }

//         }


//     })
// }




// exports.post = (req, res) => {
//     const product = req.body;

    
//     if (req.file) {
//         product.image = req.file.filename; 
//     }

//     fs.readFile("products.json", "utf-8", (err, data) => {
//         if (err) return res.status(500).send("Error reading file");

//         const products = JSON.parse(data);
        
//         products.push(product);
        
//         fs.writeFile("products.json", JSON.stringify(products, null, 2), (err) => {
//             if (err) return res.status(500).send("Error writing file");
//             res.send(product);
//         });
//     });
// };

// //אפשרות שניה ליצא פונקציה מדף
// exports.get = get;
// exports.put = (req, res) => {
//     fs.readFile("products.json", "utf-8", (err, data) => {
//         if (err) return res.status(500).send("Error reading file");

//         let products = JSON.parse(data);
//         const id = req.params.id;
//         const updatedProduct = req.body;

//         const index = products.findIndex(p => p.id == id);
//         if (index === -1) {
//             return res.status(404).send("Product not found");
//         }

//         // מחליף את המוצר הישן בחדש
//         products[index] = { ...products[index], ...updatedProduct };

//         fs.writeFile("products.json", JSON.stringify(products), (err) => {
//             if (err) return res.status(500).send("Error writing file");
//             res.send(products[index]);
//         });
//     });
// };
// exports.delete = (req, res) => {
//     fs.readFile("products.json", "utf-8", (err, data) => {
//         if (err) return res.status(500).send("Error reading file");

//         let products = JSON.parse(data);
//         const id = req.params.id;

//         const index = products.findIndex(p => p.id == id);
//         if (index === -1) {
//             return res.status(404).send("Product not found");
//         }

//         const deletedProduct = products.splice(index, 1)[0];

//         fs.writeFile("products.json", JSON.stringify(products), (err) => {
//             if (err) return res.status(500).send("Error writing file");
//             res.send(deletedProduct);
//         });
//     });
// };

const fs = require('fs');
const path = require('path');

// שליפה של כל המוצרים
function get(req, res) {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }
        res.send(JSON.parse(data));
    });
}

// שליפה לפי מזהה
exports.getById = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) return res.status(500).send("Error reading file");

        const id = req.params.id;
        const products = JSON.parse(data);
        const product = products.find(p => p.id == id);

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.send(product);
    });
};

// // הוספת מוצר חדש (כולל תמונה)
// exports.post = (req, res) => {
//     const product = req.body;

//     // שמירת הנתיב הנכון של התמונה
//     if (req.file) {
//         product.image = `/image/${req.file.filename}`; 
//     }

//     fs.readFile("products.json", "utf-8", (err, data) => {
//         if (err) return res.status(500).send("Error reading file");

//         const products = JSON.parse(data);
//         products.push(product);

//         fs.writeFile("products.json", JSON.stringify(products, null, 2), (err) => {
//             if (err) return res.status(500).send("Error writing file");
//             res.send(product);
//         });
//     });
// };
exports.post = (req, res) => {
    const product = req.body;

    if (req.file) {
        product.imgUrl = `/image/${req.file.filename}`;
    }

    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) return res.status(500).send("Error reading file");

        const products = JSON.parse(data);
        products.push(product);

        fs.writeFile("products.json", JSON.stringify(products, null, 2), (err) => {
            if (err) return res.status(500).send("Error writing file");
            res.send(product);
        });
    });
};

// עדכון מוצר
exports.put = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) return res.status(500).send("Error reading file");

        let products = JSON.parse(data);
        const id = req.params.id;
        const updatedProduct = req.body;

        const index = products.findIndex(p => p.id == id);
        if (index === -1) {
            return res.status(404).send("Product not found");
        }

        products[index] = { ...products[index], ...updatedProduct };

        fs.writeFile("products.json", JSON.stringify(products, null, 2), (err) => {
            if (err) return res.status(500).send("Error writing file");
            res.send(products[index]);
        });
    });
};

// מחיקת מוצר
exports.delete = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) return res.status(500).send("Error reading file");

        let products = JSON.parse(data);
        const id = req.params.id;

        const index = products.findIndex(p => p.id == id);
        if (index === -1) {
            return res.status(404).send("Product not found");
        }

        const deletedProduct = products.splice(index, 1)[0];

        fs.writeFile("products.json", JSON.stringify(products, null, 2), (err) => {
            if (err) return res.status(500).send("Error writing file");
            res.send(deletedProduct);
        });
    });
};

// שליחה החוצה
exports.get = get;
