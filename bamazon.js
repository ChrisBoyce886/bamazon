// NPM Packages
var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

// MySQL Credentials 
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
    database: "bamazon_db"
});

// Connect to MySQL database and alert user of successful connection
connection.connect(function(error){
    if (error) throw error;
    console.log("=====================================");
    console.log("You are connected to MySQL as ID: " + connection.threadId);
    console.log("=====================================" + "\n");

    displayProducts();
}); 

// Create function to grab data from MySQL Database and display all data via console.log
function displayProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function (error, response) {
        if (error) throw error;
            // Styling 
            console.log(" _       __     __                             __            ");
            console.log("| |     / /__  / /________  ____ ___  ___     / /_____       ");
            console.log("| | /| / / _ \\/ / ___/ __ \\/ __ `__ \\/ _ \\   / __/ __ \\ ");
            console.log("| |/ |/ /  __/ / /__/ /_/ / / / / / /  __/  / /_/ /_/ /      ");
            console.log("|__/|__/\\___/_/\\___/\\____/_/ /_/ /_/\\___/   \\__/\\____/ ");
            console.log("\n");
            console.log("    ____  ___    __  ______ _____   ____   _   __ ");
            console.log("   / __ )/   |  /  |/  /   /__  /  / __ \\ / | / /");
            console.log("  / __  / /| | / /|_/ / /| | / /  / / /  /   / /  ");
            console.log(" / /_/ / ___ |/ /  / / ___ |/ /__/ /_/  / /|  /   ");
            console.log("/_____/_/  |_/_/  /_/_/  |_/____/\\_____/_/ |_/   ");
            console.log("");
            console.log("\n" + "Below is an updated list of available products for purchase:" + "\n" + "\n");
            
            // Create column header for table below
            console.log("#" + " || " + 
                    "Product" + " | " + 
                    "Department" + " | " + 
                    "Price" + " | " + 
                    "Quantity");
            console.log("============================================================");
            // Loop through all data and push into a visible table for terminal viewing 
            for (i = 0; i < response.length; i++) {                                
                console.log(response[i].itemID + " || " + 
                            response[i].productName + " | " + 
                            response[i].departmentName + " | " + 
                            "$" + response[i].price + " | " + 
                            response[i].stockQuantity);
                console.log("------------------------------------------------------------");
            }
        console.log("\n");
        // Call function that will display inquirer prompts 
        issuePrompts(response);
    });
};

// Create inquirer input prompt that will prompt user to enter The ID Number of the product he/she would like to purchase
function issuePrompts(response) {
    inquirer.prompt([{
        type: "input",
        name: "selection",
        message: "What is the ID Number of the item you wish to purchase?",
        // Validate to ensure user input is a number, if not, return false
        validate: function(value) {
            if(isNaN(value) == false) {
                return true;
                } else {
                    console.log(" - Error: Please check input");
                    return false;
                }
            }
    // Create promise handling that then loops through product ID Numbers, and if one matches the users input, assign to a variable for later
    }]).then(function(answer) {
        var match = false;
        for (i = 0; i < response.length; i++) {
            if(response[i].itemID == answer.selection) {
                var loop = i;                
                var selection = answer.selection;
                match = true;
    // Create another inquirer input prompt that asks user how many of the selected product they would like to purchase
    inquirer.prompt({
        type: "input",
        name: "quantity",
        message: "How many of this item would you like to purchase?",
        // Validate to ensure user input is a number, if not, return false
        validate: function(value) {
            if(isNaN(value) == false) {
                return true;
                } else {
                    console.log(" - Error: Please check input");
                    return false;
                }
            }
    // Create promise that then finds the difference between the quantity of the product available and the quantity that the user wishes to buy and assign to a variable
    }).then(function(answer){
        var remaining = response[loop].stockQuantity - answer.quantity;
            // If the product quantity remaining is above 0, do a connection.query to update the MySQL database with the new product quantity
            if(remaining >= 0) {
                var query2 = "UPDATE products SET stockQuantity="
                connection.query(query2 + remaining + " WHERE itemID=" + selection, 
                    // Re-display the table with the new numbers and a message that thanks user for the purchase 
                    function() {
                        // Add up the total cost of the purchase and display to the user
                        var totalCost = response[loop].price * answer.quantity  
                        console.log("\n" + "=====================================================================================");
                        console.log("Your purchase was successful, Thank you! \n");
                        console.log("Your purchase total was $" + totalCost);
                        console.log(" \nIt was a pleasure helping you today. Come again soon!");
                        console.log("=====================================================================================");
                        displayProducts();
                    })
            // If the users quantity input exceeds the available product quantity alert the user with an error message and the quantity in stock.  
            } else {
                console.log("\n" + "=====================================================================================");
                console.log("Error: Insufficient quantity. \nOnly " + response[loop].stockQuantity + " of these items are currently available for purchase.");
                console.log("=====================================================================================" + "\n");
                issuePrompts(response);
            };
        });
    };
};
});
};