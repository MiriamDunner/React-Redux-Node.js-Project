
const fs = require('fs');
// const path = require("path");
// const usersFilePath = path.join(__dirname, "..", "users.json");

function get(req, res) {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let user = data.find(st => st.id == id)

            if (user == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(user);
            }

        }


    })
}

exports.login = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            let user = req.body
            data = JSON.parse(data);
           let currentUser = data.find(st => st.password == user.password && st.tz == user.tz)
            if (currentUser == undefined) {
                res.status(500).send("user isn't exist!, please register");
            } else {
                res.send(currentUser);
            }

        }

    })
    }

exports.post = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        //המרה של טקסט למערך
        let users = JSON.parse(data);
        //body =  לתוכן שנשלח בפונקציה פןסט 
        // console.log(users[users.length+6].id + 1)
        console.log(users[users.length-1].id + 1);

        // console.log(Number(users[users.length-1].id) + 1)
        req.body.id = users[users.length-1].id + 1
        
        users.push(req.body);
        fs.writeFile("users.json", JSON.stringify(users), (err) => {
            if(req.body!=null){
            if (err) {
                res.status(500).send("error  in add users ");
            } else {
                res.send("sucess add");
            }}
        })
    })
}
//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
// const fs = require('fs');
// const path = require('path');
// const usersFilePath = path.join(__dirname, '..', 'users.json');

// function get(req, res) {
//     fs.readFile(usersFilePath, "utf-8", (err, data) => {
//         if (err) {
//             return res.status(500).send("error read file users ");
//         }
//         res.send(JSON.parse(data));
//     });
// }

// exports.getById = (req, res) => {
//     fs.readFile(usersFilePath, "utf-8", (err, data) => {
//         if (err) {
//             return res.status(500).send("error read file users ");
//         }
//         let id = req.params.id;
//         let users = JSON.parse(data);
//         let user = users.find(st => st.id == id);
//         if (!user) {
//             return res.status(404).send("not found user by id " + id);
//         }
//         res.send(user);
//     });
// }

// exports.login = (req, res) => {
//     fs.readFile(usersFilePath, "utf-8", (err, data) => {
//         if (err) {
//             return res.status(500).send("error read file users ");
//         }
//         let user = req.body;
//         let users = JSON.parse(data);
//         let currentUser = users.find(st => st.password === user.password && st.tz === user.tz);
//         if (!currentUser) {
//             return res.status(404).send("user isn't exist!, please register");
//         }
//         res.send(currentUser);
//     });
// }

// exports.post = (req, res) => {
//     if (!req.body || Object.keys(req.body).length === 0) {
//         return res.status(400).send("Invalid user data");
//     }
//     fs.readFile(usersFilePath, "utf-8", (err, data) => {
//         if (err) {
//             return res.status(500).send("error reading users file");
//         }
//         let users = JSON.parse(data);
//         let lastId = 0;
//         if (users.length > 0) {
//             lastId = Number(users[users.length - 1].id) || 0;
//         }
//         req.body.id = lastId + 1;
//         users.push(req.body);
//         fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
//             if (err) {
//                 return res.status(500).send("error adding user");
//             }
//             res.send("success add");
//         });
//     });
// }

// exports.get = get;
