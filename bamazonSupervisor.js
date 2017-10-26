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
    supervisorView();
});

function supervisorView() {
    inquirer
    .prompt([
      {
        name: 'action',
        type: 'list',
        message: 'What do you want to do, supervisor?',
        choices: ['View Product Sales by Department', 'Create New Department']
      },
    ])
    .then(function(answer) {
      switch (answer.action) {
        case 'View Product Sales by Department':
          viewSale();
        break;
        case 'Create New Department':
          newDepartment();
        break;
      }
    });
}

// display a summarized table
// constructor for table
function Item(id, name, cost, sales, profit) {
    this.Department_ID = id;
    this.Department_Name = name;
    this.Overhead_Costs = cost;
    this.Product_Sales = sales;
    this.Total_Profit = profit;
}

function viewSale() {
  var query = 'SELECT departments.department_id, departments.department_name, departments.over_head_costs, '; // columns from table departments
  query += 'products.department_name, SUM(products.product_sales) AS product_sales, '; // columns from table products
  query += 'product_sales - departments.over_head_costs AS total_profit '; // create column total_profit
  query += 'FROM departments LEFT JOIN products ON departments.department_name = products.department_name '; // join 2 tables
  query += 'GROUP BY departments.department_name ORDER BY departments.department_id ASC'; // group result
  
  connection.query(query, (err, res) => {
      if (err) throw err;

      // console.log(res);

      var table = [];

      console.log('\n========================================\nList of Product Sales by Department:\n');
  
      // run throught table products in database
      for (var i = 0; i < res.length; i++) {
        table.push(new Item(res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit)); // add new item to table array
      }
  
      console.table(table); // print out the table as table - tablinception
  
      connection.end();
      process.exit();
  });
}

function newDepartment() {
  inquirer
  .prompt([
    {
      name: 'department',
      type: 'input',
      message: 'Enter name of new department:'
    },
    {
      name: 'cost',
      type: 'input',
      message: 'New department over head costs:'
    }
  ])
  .then(function(answer) {
    var department = answer.department;
    var cost = answer.cost;

    // add new department to table departments
    connection.query('INSERT INTO departments (department_name, over_head_costs) VALUES ("' + department + '", ' + cost + ')', (err, res) => {
      if (err) throw err;

      // also add the new department to table products
      connection.query('INSERT INTO products (department_name) VALUES ("' + department + '")', (err, res) => {
        if (err) throw err;

        console.log('New department has been successfully added!');
        
        connection.end();
        process.exit();
      });
    });
  });  
}