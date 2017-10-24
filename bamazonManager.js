var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');

// create connection with bamazon database
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'bamazon' // insert database name
});

// check if connection made
connection.connect((err) => {
  if (err) throw err;
  managerView();
});

// * Create a new Node application called `bamazonManager.js`. Running this application will:

//   * List a set of menu options:

//     * View Products for Sale
    
//     * View Low Inventory
    
//     * Add to Inventory
    
//     * Add New Product

function managerView() {
  var inquirer = require('inquirer'); // require npm inquirer
  inquirer
  .prompt([
    {
      name: 'action',
      type: 'list',
      message: 'What do you want to do, manager?',
      choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    },
  ])
  .then(function(answer) {
    switch (answer.action) {
      case 'View Products for Sale':
        viewProducts();
      break;
      case 'View Low Inventory':
        lowInventory();
      break;
      case 'Add to Inventory':
        console.log('Add to inventory');
      break;
      case 'Add New Product':
        console.log('Add new product');
      break;
    }
  });
}

//   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
// constructor for table
function Item(id, name, price, quantity) {
  this.ID = id;
  this.Name = name;
  this.Price = '$' + price;
  this.Quantity = quantity;
}

function viewProducts() {
  connection.query('SELECT * FROM products', (err, res) => {
    if (err) throw err;

    var table = [];

    // run throught table products in database
    for (var i = 0; i < res.length; i++) {
      table.push(new Item(res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity)); // add new item to table array
    }

    console.table(table); // print out the table as table - tablinception
  });
}

//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
function lowInventory() {
  connection.query('SELECT * FROM products WHERE stock_quantity < 5', (err, res) => {
    if (err) throw err;

    var table = [];
    console.log('\n========================================\nList of items with low inventory (< 5):\n');
    
    // run throught table products in database
    for (var i = 0; i < res.length; i++) {
      table.push(new Item(res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity)); // add new item to table array
    }

    console.table(table); // print out the table as table - tablinception
  });
}

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.