const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("restaurants.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function (data) {
    csvData.push(data);
  })
  .on("end", function () {
    csvData.shift();
    for (let d of csvData) {
      d.splice(0, 0, (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)))
    }
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: null,
      database: "restaurants_db"
    });

    connection.connect(error => {
      if (error) {
        console.error(error);
      } else {
        console.log(csvData)
        let query =
          "INSERT INTO restaurants (id, name, type, phone, location) VALUES ?";
        connection.query(query, [csvData], (error, response) => {
          console.log(error || response);
        });
      }
    });
  });

stream.pipe(csvStream);