const express = require('express')
const app = express()
const port = 3000
const artistRoutes = require('./routes/artist.route')
const songRoutes = require('./routes/song.route')
const triviaRoutes = require('./routes/trivia.route')
const userRoutes = require('./routes/user.route')

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/trivia2', trivia_question_2);

app.get('/search_song_by_name', search_song_by_name);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.get('/artist/genres', artistRoutes.artist_genres)

app.get('/artist/recommended', artistRoutes.recommended_artists)

app.get('/song/search', songRoutes.search_song_by_name)

app.get('/song/info', songRoutes.song_info)

app.get('/song/1weekbillboard', songRoutes.songs_by_artist_1weekbillboard)


app.listen(port, () => {
  console.log(`listening on ${port}`)
})
