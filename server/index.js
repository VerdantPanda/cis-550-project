const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const apicache = require('apicache');
const redis = require('redis');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
require('dotenv').config();

const app = express();
const port = 3001;
const https = require('https');
const http = require('http');
const fs = require('fs');

const artistRoutes = require('./routes/artist.route');
const songRoutes = require('./routes/song.route');
const triviaRoutes = require('./routes/trivia.route');
const userRoutes = require('./routes/user.route');

// SSL Https Code

var key = fs.readFileSync('./certs/selfsigned.key');
var cert = fs.readFileSync('./certs/selfsigned.crt');
var options = {
  key: key,
  cert: cert,
};

app.use(morgan('dev'));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(jsonParser);
/*
// Configure Mongoose
const uri = process.env.ATLAS_URI;

mongoose.set('strictQuery', false);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

//configure apicache
let cache = apicache.middleware;
const redisClient = redis.createClient();
(async () => {
  redisClient.connect().then(() => {
    console.log('successfully connected to local redis server.');
  });
})();
let cacheWithRedis = apicache.options({
  redisClient,
}).middleware;
*/
//caching all routes for 5 minutes

// TODO: manually apply this to all routes except quiz ones
// app.use(cacheWithRedis('5 minutes'));

app.use(
  cors({
    origin: '*',
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
/*
app.get(
  '/artist/search',
  cacheWithRedis('5 minutes'),
  artistRoutes.search_artist_by_name
);

app.get(
  '/artist/genres',
  cacheWithRedis('5 minutes'),
  artistRoutes.artist_genres
);

app.get(
  '/artist/recommended',
  cacheWithRedis('5 minutes'),
  artistRoutes.recommended_artists
);

app.get(
  '/artist/searchfromgenre',
  cacheWithRedis('5 minutes'),
  artistRoutes.search_artists_from_genres
);

app.get(
  '/song/search',
  cacheWithRedis('5 minutes'),
  songRoutes.search_song_by_name
);

app.get('/song/info', cacheWithRedis('5 minutes'), songRoutes.song_info);

app.get(
  '/song/1weekbillboard',
  cacheWithRedis('5 minutes'),
  songRoutes.songs_by_artist_1weekbillboard
);

app.get(
  '/song/recommended',
  cacheWithRedis('5 minutes'),
  songRoutes.song_recommendations
);
*/
app.get('/triviaquestion', triviaRoutes.trivia_question);

app.get('/triviainfo', triviaRoutes.trivia_info);

app.get('/triviaanswers_1', triviaRoutes.trivia_answers_1);

app.get('/triviaanswers_2', triviaRoutes.trivia_answers_2);

app.get('/triviaanswers_3', triviaRoutes.trivia_answers_3);

app.get('/triviaanswers_4', triviaRoutes.trivia_answers_4);

app.get('/triviaanswers_5', triviaRoutes.trivia_answers_5);

app.get('/triviaanswers_6', triviaRoutes.trivia_answers_6);

app.get('/triviaanswers_7', triviaRoutes.trivia_answers_7);

app.get('/triviaanswers_8', triviaRoutes.trivia_answers_8);

app.get('/triviaanswers_9', triviaRoutes.trivia_answers_9);

app.get('/triviaanswers_10', triviaRoutes.trivia_answers_10);

app.post('/user', userRoutes.createUser);
/*
app.post('/login', cacheWithRedis('5 minutes'), userRoutes.loginUser);

app.put('/user/songs', cacheWithRedis('5 minutes'), userRoutes.setSongs);

app.get('/user/songs', cacheWithRedis('5 minutes'), userRoutes.getSongs);
*/
const httpServer = http.createServer(app);
const server = https.createServer(options, app);

httpServer.listen(8080);
server.listen(port, () => {
  console.log('server starting on port : ' + port);
});
