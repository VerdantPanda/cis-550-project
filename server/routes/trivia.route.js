/*

Trivia question 1: An artist who is top of the billboard and also incorporates multiple genres

*/

const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// Connection details
const connection = mysql.createConnection({
    host: "database-550-project.cuttkkiuv1vf.us-east-2.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "450550ansibrmicmua!",
    URL: "jdbc:mysql://database-550-project.cuttkkiuv1vf.us-east-2.rds.amazonaws.com:3306",
});
connection.connect();
