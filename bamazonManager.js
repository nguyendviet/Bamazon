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
        addMore();
      break;
      case 'Add New Product':
        console.log('Add new product');
      break;
    }
  });
}

// list every available item
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

// list all items with inventory count < 5
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

// add more of any item currently in the store
function addMore() {
  connection.query('SELECT * FROM products', (err, res) => {
    if (err) throw err;

    var table = [];

    console.log('\n========================================\nList of all the items currently in the store:\n');

    // run throught table products in database
    for (var i = 0; i < res.length; i++) {
      table.push(new Item(res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity)); // add new item to table array
    }

    console.table(table); // print out the table as table - tablinception

    chooseItem();
  });
}

// pick item to add
function chooseItem() {
  inquirer
  .prompt([
    {
      name: 'id',
      type: 'input',
      message: 'Enter product ID to increase stock:',
    },
    {
      name: 'quantity',
      type: 'input',
      message: 'Set number of units:',
      // check if user orders nothing
      validate: (val) => {
        if (val < 1) {
          return false;
        }
        else {
          return true;
        }
      }
    }
  ])
  .then((res) => {
     addItem(res.id, res.quantity);
  });
}

function addItem(id, quantity) {
  // update quantity in stock
  connection.query('UPDATE products SET ? WHERE ?',
  [
    {
      stock_quantity: quantity
    },
    {
      item_id: id
    }
  ],
  (err) => {
    if (err) throw err;
    console.log('Inventory has been successfully updated!');
  });
}

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.