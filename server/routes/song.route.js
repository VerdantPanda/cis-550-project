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
