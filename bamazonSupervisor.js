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

// 4. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

//    * View Product Sales by Department
   
//    * Create New Department

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
          console.log('Create New Department');
        break;
      }
    });
}

// 5. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

// | department_id | department_name | over_head_costs | product_sales | total_profit |
// | ------------- | --------------- | --------------- | ------------- | ------------ |
// | 01            | Electronics     | 10000           | 20000         | 10000        |
// | 02            | Clothing        | 60000           | 100000        | 40000        |

function Item(id, name, cost, sales, profit) {
    this.Department_ID = id;
    this.Department_Name = name;
    this.Overhead_Costs = cost;
    this.Product_Sales = sales;
    this.Total_Profit = profit;
}

function viewSale() {
    connection.query('SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.department_name FROM departments LEFT JOIN products ON departments.department_name = products.dfepartment_name', (err, res) => {
        if (err) throw err;

        console.log(res);

        /* var table = [];
        console.log('\n========================================\nList of Product Sales by Department:\n');
    
        // run throught table products in database
        for (var i = 0; i < res.length; i++) {
          table.push(new Item(res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity)); // add new item to table array
        }
    
        console.table(table); // print out the table as table - tablinception
    
        process.exit(); */
    });
}

// 6. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

// 7. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.

//    * Hint: You may need to look into aliases in MySQL.

//    * Hint: You may need to look into GROUP BYs.

//    * Hint: You may need to look into JOINS.