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

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'database-550-project.cuttkkiuv1vf.us-east-2.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: '450550ansibrmicmua!',
  URL: 'jdbc:mysql://database-550-project.cuttkkiuv1vf.us-east-2.rds.amazonaws.com:3306',
  database: 'MUSIC_DB',
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
    avg(s.instrumentalness) as artist_instrumentalness,
    avg(s.liveness) as artist_liveness,
    avg(s.valence) as artist_valence,
    avg(s.tempo) as artist_tempo
    from Song_artist sa
    left join Song s on s.song_id = sa.song_id
    where sa.artist_name = '${ArtistName}'
    Group by sa.artist_name
    )
select g.genre_name as artist_genres
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
and g.instrumentalness between (select artist_instrumentalness-0.2 from attributes) and
                    (select artist_instrumentalness+0.2 from attributes)
and g.liveness between (select artist_liveness-0.2 from attributes) and
                    (select artist_liveness+0.2 from attributes)
and g.valence between (select artist_valence-0.2 from attributes) and
                    (select artist_valence+0.2 from attributes)
and g.tempo between (select artist_tempo-20 from attributes) and
                    (select artist_tempo+20 from attributes)
ORDER BY
abs((Select artist_danceability From attributes) - g.danceability)
+ abs((Select artist_energy From attributes) - g.energy)
+ abs((Select artist_loudness From attributes) - g.loudness)/
((Select max(Song.loudness) From Song) - (Select min(Song.loudness) From Song))
+ abs((Select artist_speechiness From attributes) - g.speechiness)
+ abs((Select artist_acousticness From attributes) - g.acousticness)
+ abs((Select artist_instrumentalness From attributes) - g.instrumentalness)
+ abs((Select artist_liveness From attributes) - g.liveness)
+ abs((Select artist_valence From attributes) - g.valence)
+ abs((Select artist_tempo From attributes) - g.tempo)/
((Select max(tempo) From Song) - (Select min(tempo) From Song))
LIMIT 10;`,
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
    (Select c.artist_name,
    c.artist_danceability,
    c.artist_energy,
    c.artist_loudness,
    c.artist_speechiness,
    c.artist_acousticness,
    c.artist_instrumentalness,
    c.artist_liveness,
    c.artist_valence,
    c.artist_tempo
    From Artist_features_cache c
    Where c.artist_name = '${ArtistName}'
    )
Select c2.artist_name as recommended_artists
from Artist_features_cache c2
where c2.artist_name <> (select artist_name from attributes)
and c2.artist_danceability between (select artist_danceability-0.2 from attributes)
and     (select artist_danceability+0.2 from attributes)
and c2.artist_energy between (select artist_energy-0.2 from attributes) and
        (select artist_energy+0.2 from attributes)
and c2.artist_loudness between (select artist_loudness-0.4 from attributes) and
        (select artist_loudness+0.4 from attributes)
and c2.artist_speechiness between (select artist_speechiness-0.2 from attributes) and
    (select artist_speechiness+0.2 from attributes)
and c2.artist_acousticness between (select artist_acousticness-0.2 from attributes) and
        (select artist_acousticness+0.2 from attributes)
and c2.artist_instrumentalness between (select artist_instrumentalness-0.2 from attributes) and
        (select artist_instrumentalness+0.2 from attributes)
and c2.artist_liveness between (select artist_liveness-0.2 from attributes) and
        (select artist_liveness+0.2 from attributes)
and c2.artist_valence between (select artist_valence-0.2 from attributes) and
        (select artist_valence+0.2 from attributes)
and c2.artist_tempo between (select artist_tempo-20 from attributes) and
        (select artist_tempo+20 from attributes)
ORDER BY
abs((Select artist_danceability From attributes) - c2.artist_danceability)
+ abs((Select artist_energy From attributes) - c2.artist_energy)
+ abs((Select artist_loudness From attributes) - c2.artist_loudness)/
((Select max(Song.loudness) From Song) - (Select min(Song.loudness) From Song))
+ abs((Select artist_speechiness From attributes) - c2.artist_speechiness)
+ abs((Select artist_acousticness From attributes) - c2.artist_acousticness)
+ abs((Select artist_instrumentalness From attributes) - c2.artist_instrumentalness)
+ abs((Select artist_liveness From attributes) - c2.artist_liveness)
+ abs((Select artist_valence From attributes) - c2.artist_valence)
+ abs((Select artist_tempo From attributes) - c2.artist_tempo)/
((Select max(tempo) From Song) - (Select min(tempo) From Song))
LIMIT 100;`,
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

async function search_artists_from_genres(req, res) {
  const GenreName = req.query.GenreName ? req.query.GenreName : '';
  connection.query(
    `WITH attributes as
    (select s.danceability as artist_danceability,
            s.energy as artist_energy,
            s.loudness as artist_loudness,
            s.speechiness as artist_speechiness,
            s.acousticness as artist_acousticness,
            s.instrumentalness as artist_instrumentallness,
            s.liveness as artist_liveness,
            s.valence as artist_valence,
            s.tempo as artist_tempo
     from Genre s
     where s.genre_name = \'${GenreName}\'
      )
    select a.artist_name as recommended_artists
    from Song_artist a join Song s on s.song_id = a.song_id
    group by a.artist_name
    having avg(s.danceability) between (select artist_danceability-0.2 from attributes) and
                                    (select artist_danceability+0.2 from attributes)
    and avg(s.energy) between (select artist_energy-0.2 from attributes) and
                                    (select artist_energy+0.2 from attributes)
    and avg(s.loudness) between (select artist_loudness-0.4 from attributes) and
                                    (select artist_loudness+0.4 from attributes)
    and avg(s.speechiness) between (select artist_speechiness-0.2 from attributes) and
                                    (select artist_speechiness+0.2 from attributes)
    and avg(s.acousticness) between (select artist_acousticness-0.2 from attributes) and
                                    (select artist_acousticness+0.2 from attributes)
    and avg(s.instrumentalness) between (select artist_instrumentallness-0.2 from attributes) and
                                    (select artist_instrumentallness+0.2 from attributes)
    and avg(s.liveness) between (select artist_liveness-0.2 from attributes) and
                                    (select artist_liveness+0.2 from attributes)
    and avg(s.valence) between (select artist_valence-0.2 from attributes) and
                                    (select artist_valence+0.2 from attributes)
    and avg(s.tempo) between (select artist_tempo-10 from attributes) and
                                    (select artist_tempo+10 from attributes);`,
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

//Route: Search an artist using an artist name string
async function search_artist_by_name(req, res) {
  const ArtistName = req.query.ArtistName ? req.query.ArtistName : '';

  connection.query(
    `SELECT DISTINCT a.artist_name
        FROM Song_artist a
        WHERE a.artist_name LIKE '%${ArtistName}%'
        ORDER BY a.artist_name
        LIMIT 50`,
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
  artist_genres,
  recommended_artists,
  search_artists_from_genres,
  search_artist_by_name,
};
