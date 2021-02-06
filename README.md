# Full Stack Application - Restaurants App

A web page that loads a list of restaurants from a CSV file and displays the data in a searchable table.

The user can see the list of restaurants, search for restaurants based on restaurant name, delete/edit/add a restaurant

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

Clone this repository

(make sure you have Node, NPM and MySQL installed globally on your machine)

### `run npm install`

Database setup:
  access mysql server and in the terminal run `create database restaurants_db;` 
  go to server/data and run `tables.sql` to create restaurant table & `node migration.js` to migrate data from CSV file

In the project directory:
 `npm start`
 `node server`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Technologies

Frontend: React, MobX, Material-ui
Backend: NodeJS, Express, Sequelize, Axios
Database: MySQL

 `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
