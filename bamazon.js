require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("You are connected to MySQL as ID: " + connection.threadId);
    // start();
}); 

// var start = function(){
//     inquirer.prompt({

//     })
// }