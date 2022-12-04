/*

Trivia question 1: An artist who is top of the billboard and also incorporates multiple genres

Trivia question 2: Which of the following artists incorporates the most number of genres?
*/

// import { trivia_question_2 } from './routes/trivia.route.js';
// const config = require('./config.json');
// import mysql from 'mysql';
const mysql = require('mysql');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
  host: 'database-550-project.cuttkkiuv1vf.us-east-2.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: '450550ansibrmicmua!',
  URL: 'jdbc:mysql://database-550-project.cuttkkiuv1vf.us-east-2.rds.amazonaws.com:3306',
  database: 'MUSIC_DB',
});
connection.connect();

//Route:  Which of the following artists incorporates the most number of genres?
async function trivia_question_2(req, res) {
  const SongName = req.query.SongName ? req.query.SongName : '';

  connection.query(
    `select artist_name,
    genre_count
    from (
        WITH attributes as
            (select artist_name,
                    avg(s.danceability) as artist_danceability,
                    avg(s.energy) as artist_energy,
                    avg(s.loudness) as artist_loudness,
                    avg(s.speechiness) as artist_speechiness,
                    avg(s.acousticness) as artist_acousticness,
                    avg(s.instrumentalness) as artist_instrumentallness,
                    avg(s.liveness) as artist_liveness,
                    avg(s.valence) as artist_valence,
                    avg(s.tempo) as artist_tempo
            from Song_artist sa
            left join  Song s on s.song_id = sa.song_id
            #where sa.artist_name in ('Bruno Mars', 'Linkin Park', 'Taylor Swift', 'Dua Lipa')
            Group by sa.artist_name
            )
        select a.artist_name, count(g.genre_name) as genre_count
        from attributes a
        join Genre g
        on g.danceability between a.artist_danceability-0.2 and a.artist_danceability+0.2
        and g.energy between a.artist_energy-0.2 and a.artist_energy+0.2
        and g.loudness between a.artist_loudness-0.4 and a. artist_loudness+0.4
        and g.speechiness between a.artist_speechiness-0.2 and a.artist_speechiness+0.2
        and g.acousticness between a.artist_acousticness-0.2 and a.artist_acousticness+0.2
        and g.instrumentalness between a.artist_instrumentallness-0.2 and a.artist_instrumentallness+0.2
        and g.liveness between a.artist_liveness-0.2 and a.artist_liveness+0.2
        and g.valence between a.artist_valence-0.2 and a.artist_valence+0.2
        and g.tempo between a.artist_tempo-20 and a.artist_tempo+20
        group by a.artist_name
        order by genre_count desc) a
    limit 4;`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    }
  );
}

module.exports = {
  trivia_question_2,
};
