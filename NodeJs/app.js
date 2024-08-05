const http = require('node:http');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser")

const {Client}  = require('pg');



const hostname = '127.0.0.1';
const port = 3000;

// Database connection configuration
const dbConfig = {
	user: 'postgres',
	password: 'password',
	host: '127.0.0.1',
	port: '5432',
	database: 'TestDB',
};

// Create a new PostgreSQL client
const client = new Client(dbConfig);

DATA = []

// Connect to the database
client
	.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');

		// Execute SQL queries here

		client.query('SELECT * FROM public.employees ORDER BY id ASC ', (err, result) => {
			if (err) {
				console.error('Error executing query', err);
			} else {
				console.log('Query result:', result.rows);
				DATA = result.rows
			}

			// Close the connection when done
			client
				.end()
				.then(() => {
					console.log('Connection to PostgreSQL closed');
				})
				.catch((err) => {
					console.error('Error closing connection', err);
				});
		});
	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	});

async function test(){
	const DATA = await client.query('SELECT * FROM public.employees ORDER BY id ASC ')
	console.log(DATA)
	await client.end()

}
test()

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
        res.send("your name is: "+ req.body.fname + " your age is: "+req.body.lname, Data.rows[0].name)

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

