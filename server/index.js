const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const artistRoutes = require('./routes/artist.route');
const songRoutes = require('./routes/song.route');
const triviaRoutes = require('./routes/trivia.route');
const userRoutes = require('./routes/user.route');

app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get('/artist/genres', artistRoutes.artist_genres);

app.get('/artist/recommended', artistRoutes.recommended_artists);

app.get('/artist/searchfromgenre', artistRoutes.search_artists_from_genres);

app.get('/song/search', songRoutes.search_song_by_name);

app.get('/song/info', songRoutes.song_info);

app.get('/song/1weekbillboard', songRoutes.songs_by_artist_1weekbillboard);

app.get('/song/recommended', songRoutes.song_recommendations);

app.get('/trivia1', triviaRoutes.trivia_question_1);

app.get('/trivia2', triviaRoutes.trivia_question_2);

app.get('/trivia3', triviaRoutes.trivia_question_3);
