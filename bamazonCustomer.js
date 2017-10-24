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
  showItems();
});

// constructor for table
function Item(id, name, price) {
  this.ID = id;
  this.Name = name;
  this.Price = '$' + price;
}

// show list of available items
function showItems() {
  connection.query('SELECT * FROM products', (err, res) => {
    if (err) throw err;

    var table = [];

    // run throught table products in database
    for (var i = 0; i < res.length; i++) {
      table.push(new Item(res[i].item_id, res[i].product_name, res[i].price)); // add new item to table array
    }

    console.table(table); // print out the table as table - tablinception

    start();
  });
}

// ask user
function start() {
  inquirer
  .prompt([
    {
      name: 'id',
      type: 'input',
      message: 'What is the ID of the product you would like to buy?',
    },
    {
      name: 'quantity',
      type: 'input',
      message: 'How many units you would like to buy?',
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
     checkQuantity(res.id, res.quantity);
  });
}

// check quantity in stock
function checkQuantity(id, orderQuantity) {
  connection.query('SELECT `product_name`, `stock_quantity` FROM products WHERE item_id = "' + id + '"', (err, res) => {
    if (err) throw err;
    var product = res[0].product_name;
    var stockQuantity = res[0].stock_quantity;

    if (stockQuantity < orderQuantity) {
      console.log('Sorry. We do not have enough in stock. Please reduce your quantity.');
      start();
    }
    else {
      console.log('Your order: ' + product + ' x ' + orderQuantity + ' has been placed!');
      placeOrder(id, stockQuantity, orderQuantity);
    }
  });
}

function placeOrder(id, stockQuantity, orderQuantity) {
  stockQuantity -= orderQuantity;

  // update quantity in stock
  connection.query('UPDATE products SET ? WHERE ?',
    [
      {
        stock_quantity: stockQuantity
      },
      {
        item_id: id
      }
    ],
  (err) => {
    if (err) throw err;
    totalCost(id, orderQuantity);
  });
}

// show total bill
function totalCost(id, quantity) {
  connection.query('SELECT price FROM products WHERE item_id = "' + id + '"', (err, res) => {
    if (err) throw err;

    var price = res[0].price;
    var total = price * quantity;

    console.log('Congratulations! Your order is on the way!\nPrice: $' + price + '\nTotal: $' + total); // ISSUE: trailing numbers in total price of order of 5 for item has .99 price tag
  });
}