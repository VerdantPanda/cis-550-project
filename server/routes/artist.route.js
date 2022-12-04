/*

Search by artist name:
Select artist where name like search
(Extension: user filters)

Artist songs:
Select songs where artist == selected_artist

Artist genres:
Pull up genres using aggregation on artist songs

Artist billboard hits:
Select songs which are in billboard and artist == selected_artist

Recommended Artists:
Compare aggregated attributes for an artist to pull up artists with similar aggregated attributes

*/

const config = require('./config.json');
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
  host: 'database-550-project.cuttkkiuv1vf.us-east-2.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: '450550ansibrmicmua!',
  URL: 'jdbc:mysql://database-550-project.cuttkkiuv1vf.us-east-2.rds.amazonaws.com:3306',
});
connection.connect();

//Route: Display the genres that a specific artist incorporates when a user selects an artist to see
//information on that artists’ page.
async function artist_genres(req, res) {
  const ArtistName = req.query.ArtistName ? req.query.ArtistName : '';

  connection.query(
    `WITH attributes as
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
            left join Song s on s.song_id = sa.song_id
            where sa.artist_name = '${ArtistName}'
            Group by sa.artist_name
            )
        select g.genre_name as artist_genres -- consider calculated distance score
        from Genre g
        where g.danceability between (select artist_danceability-0.2 from attributes) and
                            (select artist_danceability+0.2 from attributes)
        and g.energy between (select artist_energy-0.2 from attributes) and
                            (select artist_energy+0.2 from attributes)
        and g.loudness between (select artist_loudness-0.4 from attributes) and
                            (select artist_loudness+0.4 from attributes)
        and g.speechiness between (select artist_speechiness-0.2 from attributes) and
                            (select artist_speechiness+0.2 from attributes)
        and g.acousticness between (select artist_acousticness-0.2 from attributes) and
                            (select artist_acousticness+0.2 from attributes)
        and g.instrumentalness between (select artist_instrumentallness-0.2 from attributes) and
                            (select artist_instrumentallness+0.2 from attributes)
        and g.liveness between (select artist_liveness-0.2 from attributes) and
                            (select artist_liveness+0.2 from attributes)
        and g.valence between (select artist_valence-0.2 from attributes) and
                            (select artist_valence+0.2 from attributes)
        and g.tempo between (select artist_tempo-20 from attributes) and
                            (select artist_tempo+20 from attributes)
        limit 10`,
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

//Route: Given an artist, display a set of recommended artists that share similar song
//features as the selected artist. This is a complex query.
async function recommended_artists(req, res) {
  const ArtistName = req.query.ArtistName ? req.query.ArtistName : '';

  connection.query(
    `WITH attributes as
            (select a.artist_name,
            avg(s.danceability) as artist_danceability,
            avg(s.energy) as artist_energy,
            avg(s.loudness) as artist_loudness,
            avg(s.speechiness) as artist_speechiness,
            avg(s.acousticness) as artist_acousticness,
            avg(s.instrumentalness) as artist_instrumentallness,
            avg(s.liveness) as artist_liveness,
            avg(s.valence) as artist_valence,
            avg(s.tempo) as artist_tempo
            from Song s join Song_artist a on s.song_id = a.song_id
            where a.artist_name = '%${ArtistName}%'
            group by a.artist_name
            )
        select a.artist_name as recommended_artists
        from Song_artist a join Song s on s.song_id = a.song_id
        where a.artist_name <> (select artist_name from attributes)
        group by a.artist_name
        having avg(s.danceability) between (select artist_danceability-0.2 from attributes)
        and
                (select artist_danceability+0.2 from attributes)
        and avg(s.energy) between (select artist_energy-0.2 from attributes) and
                (select artist_energy+0.2 from attributes)
        and avg(s.loudness) between (select artist_loudness-0.4 from attributes) and
                (select artist_loudness+0.4 from attributes)
        and avg(s.speechiness) between (select artist_speechiness-0.2 from attributes)
        and
                (select artist_speechiness+0.2 from attributes)
        and avg(s.acousticness) between (select artist_acousticness-0.2 from attributes)
        and
                (select artist_acousticness+0.2 from attributes)
        and avg(s.instrumentalness) between (select artist_instrumentallness-0.2 from
        attributes) and
                (select artist_instrumentallness+0.2 from attributes)
        and avg(s.liveness) between (select artist_liveness-0.2 from attributes) and
                (select artist_liveness+0.2 from attributes)
        and avg(s.valence) between (select artist_valence-0.2 from attributes) and
                (select artist_valence+0.2 from attributes)
        and avg(s.tempo) between (select artist_tempo-10 from attributes) and
                (select artist_tempo+10 from attributes)`,
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
