const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const apicache = require('apicache');
const redis = require('redis');

const app = express();
const port = 3001;

const artistRoutes = require('./routes/artist.route');
const songRoutes = require('./routes/song.route');
const triviaRoutes = require('./routes/trivia.route');
const userRoutes = require('./routes/user.route');

app.use(morgan('dev'));

//configure apicache
let cache = apicache.middleware;
let cacheWithRedis = apicache.options({ redisClient: redis.createClient() }).middleware;


//caching all routes for 5 minutes
// app.use(cache('5 minutes'));
app.use(cacheWithRedis('5 minutes'));

app.use(
  cors({
    origin: '*',
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get('/artist/search', artistRoutes.search_artist_by_name);

app.get('/artist/genres', artistRoutes.artist_genres);

app.get('/artist/recommended', artistRoutes.recommended_artists);

app.get('/artist/searchfromgenre', artistRoutes.search_artists_from_genres);

app.get('/song/search', songRoutes.search_song_by_name);

app.get('/song/info', songRoutes.song_info);

app.get('/song/1weekbillboard', songRoutes.songs_by_artist_1weekbillboard);

app.get('/song/recommended', songRoutes.song_recommendations);

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
