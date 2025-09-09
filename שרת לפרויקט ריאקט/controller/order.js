
// const fs = require('fs');

// function get(req, res) {
//     fs.readFile("orders.json", "utf-8", (err, data) => {
//         if (err) {
//             res.status(500).send("error read file student ")
//         } else {
//             res.send(JSON.parse(data));
//         }

//     })
// }
// //אפשרות ראשונה ליצא פונקציה מדף
// exports.getById = (req, res) => {

//     fs.readFile("orders.json", "utf-8", (err, data) => {
//         if (err) {
//             res.status(500).send("error read file student ")
//         } else {
//             let id = req.params.id;

//             data = JSON.parse(data);
//             let order = data.find(st => st.id == id)

//             if (order == undefined) {
//                 res.status(500).send("not found student by tz " + id);
//             } else {
//                 res.send(order);
//             }

//         }


//     })
// }

// exports.getOrdersByTz = (req, res) => {
//     const userTz = req.params.tz;

//     fs.readFile("orders.json", "utf-8", (err, data) => {
//         if (err) {
//             return res.status(500).send("שגיאה בקריאת קובץ הזמנות");
//         }

//         const orders = JSON.parse(data);
//         const userOrders = orders.filter(order => order.tz === userTz);

//         if (userOrders.length === 0) {
//             return res.status(404).send(`לא נמצאו הזמנות עבור ת"ז ${userTz}`);
//         }

//         res.send(userOrders);
//     });
// };


// exports.post = (req, res) => {
 
//   // קריאת שני הקבצים - orders ו־products
//   fs.readFile("orders.json", "utf-8", (errOrders, ordersData) => {
//     if (errOrders) {
//       return res.status(500).send("שגיאה בקריאת קובץ הזמנות");
//     }

//     fs.readFile("products.json", "utf-8", (errProducts, productsData) => {
//       if (errProducts) {
//         return res.status(500).send("שגיאה בקריאת קובץ מוצרים");
//       }

//       let orders = JSON.parse(ordersData);
//       let products = JSON.parse(productsData);

//       const newOrder = {
//         ...req.body,
//         id: Date.now(), // מזהה ייחודי להזמנה
//         orderDate: new Date().toLocaleDateString('he-IL'),
//       };
//       console.log("קיבלתי הזמנה:", newOrder);
//       console.log("מוצרים:", products);
//       // בדיקה ועדכון המלאי
//      const allInStock = newOrder.cart.every(item => {
//   const product = products.find(p => p.id === item.id);
//   if (!product) {
//     console.log(`❌ מוצר לא נמצא במלאי: ${item.id}`);
//     return false;
//   }
//   if (product.qty < item.qty) {
//     console.log(`❌ אין מספיק מלאי למוצר ${item.id}. ביקשו: ${item.qty}, יש: ${product.qty}`);
//     return false;
//   }
//   return true;
// });

//       // הפחתת כמות מהמלאי
//       newOrder.cart.forEach(item => {
//         const product = products.find(p => p.id === item.id);
//         if (product) {
//           console.log(item+"item");
//           product.stock -= item.qty;
//           // product.stock --;
//         }
//       });

//       // הוספת ההזמנה לרשימת ההזמנות
//       orders.push(newOrder);

//       // כתיבה מחדש של שני הקבצים במקביל
//       fs.writeFile("orders.json", JSON.stringify(orders, null, 2), errWriteOrders => {
//         if (errWriteOrders) {
//           return res.status(500).send("שגיאה בשמירת ההזמנה");
//         }

//         fs.writeFile("products.json", JSON.stringify(products, null, 2), errWriteProducts => {
//           if (errWriteProducts) {
//             return res.status(500).send("שגיאה בעדכון המלאי");
//           }

//           res.send("ההזמנה נשלחה והמלאי עודכן בהצלחה");
//         });
//       });
//     });
//   });
// };


//אפשרות שניה ליצא פונקציה מדף
// exports.get = get;
const fs = require('fs');

function get(req, res) {
    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("שגיאה בקריאת קובץ הזמנות");
        } else {
            res.send(JSON.parse(data));
        }
    });
}

exports.getById = (req, res) => {
    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("שגיאה בקריאת קובץ הזמנות");
        } else {
            let id = req.params.id;
            data = JSON.parse(data);
            let order = data.find(st => st.id == id);

            if (order == undefined) {
                res.status(404).send(`לא נמצאה הזמנה עם מזהה ${id}`);
            } else {
                res.send(order);
            }
        }
    });
};

exports.getOrdersByTz = (req, res) => {
    const userTz = req.params.tz;

    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("שגיאה בקריאת קובץ הזמנות");
        }

        const orders = JSON.parse(data);
        const userOrders = orders.filter(order => order.userId === userTz);

        if (userOrders.length === 0) {
            return res.status(404).send(`לא נמצאו הזמנות עבור ת"ז ${userTz}`);
        }

        res.send(userOrders);
    });
};

exports.post = (req, res) => {
    fs.readFile("orders.json", "utf-8", (errOrders, ordersData) => {
        if (errOrders) {
            return res.status(500).send("שגיאה בקריאת קובץ הזמנות");
        }

        fs.readFile("products.json", "utf-8", (errProducts, productsData) => {
            if (errProducts) {
                return res.status(500).send("שגיאה בקריאת קובץ מוצרים");
            }

            let orders = JSON.parse(ordersData);
            let products = JSON.parse(productsData);

            const newOrder = {
                ...req.body,
                id: Date.now(),
                orderDate: new Date().toLocaleDateString('he-IL'),
            };

            const allInStock = newOrder.cart.every(item => {
                const product = products.find(p => p.id === item.id);
                if (!product) {
                    console.log(`❌ מוצר לא נמצא במלאי: ${item.id}`);
                    return false;
                }
                if (product.stock < item.qty) {
                    console.log(`❌ אין מספיק מלאי למוצר ${item.id}. ביקשו: ${item.qty}, יש: ${product.stock}`);
                    return false;
                }
                return true;
            });

            if (!allInStock) {
                return res.status(400).send("אחד או יותר מהמוצרים אינם במלאי");
            }

            newOrder.cart.forEach(item => {
                const product = products.find(p => p.id === item.id);
                if (product) {
                    product.stock -= item.qty;
                }
            });

            orders.push(newOrder);

            fs.writeFile("orders.json", JSON.stringify(orders, null, 2), errWriteOrders => {
                if (errWriteOrders) {
                    return res.status(500).send("שגיאה בשמירת ההזמנה");
                }

                fs.writeFile("products.json", JSON.stringify(products, null, 2), errWriteProducts => {
                    if (errWriteProducts) {
                        return res.status(500).send("שגיאה בעדכון המלאי");
                    }

                    res.send("ההזמנה נשלחה והמלאי עודכן בהצלחה");
                });
            });
        });
    });
};

exports.get = get;