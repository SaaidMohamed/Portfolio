const http = require('node:http');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser")

const hostname = '127.0.0.1';
const port = 3000;



//Server Using Express:
const app = express();
app.use("/Public",express.static(path.join(__dirname,"Static")));
app.use(bodyParser.urlencoded({extended:false}));


app.get("/",(req,res)=>{
    res.send("hello world");
});

app.get("/params/:name/:age",(req,res)=>{              // Visit http://127.0.0.1:3000/params/Saaid/30
    console.log(req.params)
    res.send("your name is: "+ req.params.name + " your age is: "+req.params.age)
});

app.get("/query",(req,res)=>{                         // Visit http://127.0.0.1:3000/query?name=mohamed&age=30
    console.log(req.query)
    res.send("your name is: "+ req.query.name + " your age is: "+req.query.age)
});

app.get("/Saaid",(req,res)=>{
    res.sendFile(path.join(__dirname,"Static","index.html"));
});

app.get("/form",(req,res)=>{
    res.sendFile(path.join(__dirname,"Static","form.html"));
});

app.post("/form",(req,res)=>{
    console.log(req.body)
    res.send("your name is: "+ req.body.fname + " your age is: "+req.body.lname)
});






app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
  
//Serving using HTTP:

// const server = http.createServer((req, res) => {
//     if (req.url == "/"){  // if request route is home directory then respond back with 200 and "hello world"
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('Hello, World new !\n');
//     }
//     else if (req.url == "/about"){  // if request route is /about directory then respond back with 200 and "hello world"
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('this is a new world!\n');
//     }
 
// });


// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

