var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'bamazon' // insert database name
});

connection.connect((err) => {
  if (err) throw err;
  totalCost(3, 5);
});

function totalCost(id, quantity) {
    connection.query('SELECT price FROM products WHERE item_id = "' + id + '"', (err, res) => {
      if (err) throw err;
  
      var price = res[0].price;
      var total = price * quantity;
  
      console.log('Congratulations! Your order is on the way!\nPrice: $' + price + '\nTotal: $' + total);
    });
  }