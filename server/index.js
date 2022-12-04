import { trivia_question_2 } from './routes/trivia.route.js';
import {search_song_by_name} from './routes/song.route.js';
import express from 'express';
// const express = require('express');
const app = express();
const port = 3000;

// const config = require('./config.json');
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'database-550-project.cuttkkiuv1vf.us-east-2.rds.amazonaws.com',
//   port: '3306',
//   user: 'admin',
//   password: '450550ansibrmicmua!',
//   URL: 'jdbc:mysql://database-550-project.cuttkkiuv1vf.us-east-2.rds.amazonaws.com:3306',
// });
// connection.connect();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/trivia2', trivia_question_2);

app.get('/search_song_by_name', search_song_by_name);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
