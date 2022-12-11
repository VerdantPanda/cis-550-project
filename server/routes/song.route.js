/*

Search by song name: 
Select song where name like search

Once the song is selected by user, search information by song ID:
Pull out information from all tables using song ID and join at the end

Recommended Songs:
Compare song attributes with other songs and pull up songs with similar attribute range

Search Songs by feature (Filtering):
Select song where selected_feature == selected_value

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

//Route: Search a song using a song name string
async function search_song_by_name(req, res) {
  const SongName = req.query.SongName ? req.query.SongName : '';

  connection.query(
    `SELECT DISTINCT s.song_name, s.song_id, s.album, s.explicit, s.duration_ms, s.song_year
        FROM Song s
        WHERE s.song_name LIKE concat('%${SongName}%')
        ORDER BY s.song_name
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

//Route: Preview song information about various features/charts about a song when the user selects a song
async function song_info(req, res) {
  const SongId = req.query.SongId ? req.query.SongId : 0;

  connection.query(
    `SELECT song_name, album, song_year, track_number, disc_number, explicit,
               danceability, energy, music_key, loudness,
               speechiness, acousticness, instrumentalness,
               liveness, valence, tempo, duration_ms,
               CASE
	                WHEN music_key = 0 THEN 'C'
	                WHEN music_key = 1 THEN 'C#'
	                WHEN music_key = 2 THEN 'D'
	                WHEN music_key = 3 THEN 'D#'
	                WHEN music_key = 4 THEN 'E'
	                WHEN music_key = 5 THEN 'F'
	                WHEN music_key = 6 THEN 'F#'
	                WHEN music_key = 7 THEN 'G'
	                WHEN music_key = 8 THEN 'G#'
	                WHEN music_key = 9 THEN 'A'
	                WHEN music_key = 10 THEN 'A#'
	                WHEN music_key = 11 THEN 'B'
	                ELSE 'Not determined'
                END as music_key,
                CONCAT(CAST(time_signature as char),'/4') as time_signature,
                (SELECT
                    GROUP_CONCAT(artist_name ORDER BY artist_name ASC
                    SEPARATOR ', ')
                    FROM Song_artist sa
                    WHERE sa.song_id = ${SongId}
                    GROUP BY sa.song_id) as artist_name,
                (SELECT
                    Count(*)
                    FROM Billboard b
                    WHERE b.song_id = ${SongId}
                    GROUP BY b.song_id) as weeks_on_billboard
      FROM Song s
      WHERE s.song_id = ${SongId};`,
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

//Route: Display the songs for a specific artists that have been on the billboard charts for at least 1 week
async function songs_by_artist_1weekbillboard(req, res) {
  const ArtistName = req.query.ArtistName ? req.query.ArtistName : '';

  connection.query(
    `
        select distinct s.song_name, s.song_id, max(b.peak_rank) as peak_rank, s.album, s.explicit, s.duration_ms, s.song_year
        from Billboard b
        left join Song s on b.song_id = s.song_id
        where b.song_id in (
            select song_id from Song_artist
            where artist_name = '${ArtistName}'
            )
        group by s.song_name
        order by peak_rank`,
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

//Route: Get recommendations based on a given song title.
async function song_recommendations(req, res) {
  const SongId = req.query.SongId ? req.query.SongId : 1;
  connection.query(
    `WITH attributes as
        (select s.song_name,
                s.song_id,
                s.danceability as artist_danceability,
              s.energy as artist_energy,
                s.loudness as artist_loudness,
                s.speechiness as artist_speechiness,
                s.acousticness as artist_acousticness,
                s.instrumentalness as artist_instrumentallness,
                s.liveness as artist_liveness,
                s.valence as artist_valence,
                s.tempo as artist_tempo
        from Song s
        where s.song_id = ${SongId}
          )
      select s.song_id, s.song_name, s.album, s.explicit, s.duration_ms, s.song_year
      from Song s
      where s.song_id <> (select song_id from attributes)
      and s.danceability between (select artist_danceability-0.2 from attributes) and
                                      (select artist_danceability+0.2 from attributes)
      and s.energy between (select artist_energy-0.2 from attributes) and
                                      (select artist_energy+0.2 from attributes)
      and s.loudness between (select artist_loudness-0.4 from attributes) and
                                      (select artist_loudness+0.4 from attributes)
      and s.speechiness between (select artist_speechiness-0.2 from attributes) and
                                      (select artist_speechiness+0.2 from attributes)
      and s.acousticness between (select artist_acousticness-0.2 from attributes) and
                                      (select artist_acousticness+0.2 from attributes)
      and s.instrumentalness between (select artist_instrumentallness-0.2 from attributes) and
                                      (select artist_instrumentallness+0.2 from attributes)
      and s.liveness between (select artist_liveness-0.2 from attributes) and
                                      (select artist_liveness+0.2 from attributes)
      and s.valence between (select artist_valence-0.2 from attributes) and
                                      (select artist_valence+0.2 from attributes)
      and s.tempo between (select artist_tempo-20 from attributes) and
                                      (select artist_tempo+20 from attributes)
      limit 10;`,
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
  search_song_by_name,
  song_info,
  songs_by_artist_1weekbillboard,
  song_recommendations,
};
