//1) Create a Node.js script that prints "Hello, Node.js!" to the console.
//Run it using the terminal.

// console.log('Hello, Node.js')

//2) Read the contents of a text file using the fs module and print it to the console.
const fs = require('fs');
const path = require('path')
const {add,subtract,multiply,divide}= require('./functions.js')
// fs.readFile('sample_text.txt','utf-8',(err,data)=>{
//     if(err){
//         console.log("Error reading file :", err)
//     }
//     else console.log("File content :", data)
// })

//3) Create a script that writes user input from the terminal into a file.

// const outputFile = fs.createWriteStream('outputfile.txt')

// process.stdin.on('data',(input)=>{
//     outputFile.write(input);
// });

// process.stdin.on('end',()=>{
//     outputFile.end();
//     console.log('Input saved to output.txt')
// })

// console.log('Type your text. Press Ctrl+D (or Ctrl+Z + Enter on Windows) to save.');

//4) Directory Manager
//   Create a program that:
//   Creates a directory
//  Creates a file inside it
//  Writes some text into that file

// const dirName = 'mydirectory'
// const fileName = 'file.txt'
// const filepath = path.join(dirName,fileName)

// fs.mkdir(dirName,{recursive:true},(err)=>{
//     if(err){
//         console.log('Error creating directory :', err);
//         return;
//     }
//     console.log('Directory created (or already exists).')

//     let text
//     let text1 = fs.readFileSync('outputFile.txt','utf-8')
//     let text2 = fs.readFileSync('sample_text.txt','utf-8')
//     text = text1+text2;
    
//     fs.writeFile(filepath,text,(err)=>{
//         if(err){
//             console.error('Error writing file:', err);
//             return;
//         }
//         console.log('File created and text written successfully.');
//     })
// })

// console.log(add(2,3));
// console.log(subtract(2,3));
// console.log(multiply(2,3));
// console.log(divide(2,3));

// const rawdata = fs.readFileSync(`${__dirname}/mydirectory/samplejsonfile.json`,'utf8')
// console.log(rawdata)
// const data = JSON.parse(rawdata);
// console.log(data);
// data.age = 17;
// const updatedData = JSON.stringify(data,null,2);
// fs.writeFileSync(`${__dirname}/mydirectory/samplejsonfile.json`,updatedData,'utf8');
// console.log('Json file updated succesfully')