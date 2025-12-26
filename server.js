// First way to create server

// const http = require('http')
// //--> create the server

// const server = http.createServer((req,res)=>{
//     //--> Set response headers
//     res.writeHead(200,{'Content-Type':'text/plain'});
//     //--> Send response body
//     res.end('Hello, World!')
// })
// const PORT=3000;
// //--> Start listening on a port
// server.listen(PORT,()=>{
//     console.log(`Server running at https://localhost:${PORT}`)
// })

// // Second way to create server (using express)

// const express = require('express')
// const app = express();

// app.get('/about',(req,res)=>{
//     res.send('Hello from express!');
// })

// var port = 3000;
// app.listen(port,()=>{
//     console.log(`Express server running on localhost ${port}`);
// })


import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js"

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;
const MONGOURL = process.env.MONGO_URL;
console.log("Inside Server.js file")
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfuly!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO_URL =", process.env.MONGO_URL);
    console.log(err.message);
  });

