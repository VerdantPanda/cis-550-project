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
const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: "database-550-project.cuttkkiuv1vf.us-east-2.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "450550ansibrmicmua!",
    URL: "jdbc:mysql://database-550-project.cuttkkiuv1vf.us-east-2.rds.amazonaws.com:3306",
});
connection.connect();

//Route: Search a song using a song name string
async function search_song_by_name(req, res) {
    const SongName = req.query.SongName ? req.query.SongName : ""

    connection.query(`SELECT DISTINCT s.song_name
        FROM Song s
        WHERE s.song_name LIKE concat('%${SongName}%')
        ORDER BY s.song_name
        LIMIT 50`, function (error, results, fields){
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}


//Route: Preview song information about various features/charts about a song when the user selects a song
async function song_info(req, res) {
    const SongId = req.query.SongId ? req.query.SongId : 0

    connection.query(`SELECT song_name, album, song_year, track_number, disc_number, explicit,
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
        WHERE s.song_id = ${SongId}`, function (error, results, fields){
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

//Route: Display the songs for a specific artists that have been on the billboard charts for at least 1 week
async function songs_by_artist_1weekbillboard(req, res) {
    const ArtistName = req.query.ArtistName ? req.query.ArtistName : ""

    connection.query(`
        select distinct s.song_name, max(b.peak_rank) as peak_rank
        from Billboard b
        left join Song s on b.song_id = s.song_id
        where b.song_id in (
            select song_id from Song_artist
            where artist_name = '%${ArtistName}%'
            )
        group by s.song_name
        order by peak_rank`, function (error, results, fields){
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

module.exports = {
    search_song_by_name,
    song_info,
    songs_by_artist_1weekbillboard
}