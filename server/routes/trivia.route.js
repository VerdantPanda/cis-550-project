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

async function trivia_question(req, res) {
  const QuestionId = req.query.QuestionId ? req.query.QuestionId : '';
  connection.query(
    `Select question_text
     From Trivia_questions
     Where questionId = ${QuestionId}
    ;`,
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

async function trivia_info(req, res) {
  const QuestionId = req.query.QuestionId ? req.query.QuestionId : '';
  connection.query(
    `Select question_info
     From Trivia_questions
     Where questionId = ${QuestionId}
    ;`,
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


// Which of these artists had a song that appeared on a soundtrack and topped the Billboard ‘Hot 100’ chart?
async function trivia_answers_1(req, res) {
  connection.query(
    `select *
    from (
      with correct_answer as
              (
                  select a.artist_name
                  from Song_artist a join Song s on s.song_id=a.song_id
                  where a.song_id in (
                      select distinct song_id
                      from Billboard
                      where billboard_rank = 1
                      )
                  and a.song_id in (
                      select distinct song_id
                      from Soundtrack_song
              )
                  order by Rand()
                  limit 1
              ),
          incorrect_answer as
              (select artist_name, 'Incorrect' as answer_choice
               from Song_artist a
                        join Song s on s.song_id = a.song_id
               where a.song_id not in (select distinct song_id
                                       from Billboard
                                       where billboard_rank = 1)
                 and a.song_id not in (select distinct song_id
                                       from Soundtrack_song)
               order by Rand()
               limit 3)

          select c.artist_name, 'Correct' as answer_choice
          from correct_answer c
          union
          select i.artist_name, 'Incorrect' as answer_choice
          from incorrect_answer i
      ) a
    order by a.artist_name;`,
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

// Which of these artists had the loudest songs?
async function trivia_answers_2(req, res) {
  connection.query(
    `select *
    from (
      with correct_answer as
              (
                  select a.artist_name
                  from Song_artist a join Song s on s.song_id=a.song_id
                  where a.song_id in (
                      select distinct song_id
                      from Billboard
                      where billboard_rank <= 100
                      )
                  Group By a.artist_name
                  order by avg(s.loudness) desc
                  limit 1
              ),
          incorrect_answer as
              (
                  select a.artist_name
                  from Song_artist a join Song s on s.song_id=a.song_id
                  where a.song_id in (
                      select distinct song_id
                      from Billboard
                      where billboard_rank <= 100
                      )
                  Group By a.artist_name
                  order by avg(s.loudness) asc
                  limit 3
              )

          select c.artist_name, 'Correct' as answer_choice
          from correct_answer c
          union
          select i.artist_name, 'Incorrect' as answer_choice
          from incorrect_answer i
      ) a
    order by a.artist_name;`,
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

// Which of these artists had the most danceable songs?
async function trivia_answers_3(req, res) {
  connection.query(
    `select *
    from (
      with correct_answer as
              (
                  select a.artist_name
                  from Song_artist a join Song s on s.song_id=a.song_id
                  where a.song_id in (
                      select distinct song_id
                      from Billboard
                      where billboard_rank <= 100
                      )
                  Group By a.artist_name
                  order by avg(s.danceability) desc
                  limit 1
              ),
          incorrect_answer as
              (
                  select a.artist_name
                  from Song_artist a join Song s on s.song_id=a.song_id
                  where a.song_id in (
                      select distinct song_id
                      from Billboard
                      where billboard_rank <= 100
                      )
                  Group By a.artist_name
                  order by avg(s.danceability) asc
                  limit 3
              )

          select c.artist_name, 'Correct' as answer_choice
          from correct_answer c
          union
          select i.artist_name, 'Incorrect' as answer_choice
          from incorrect_answer i
      ) a
    order by a.artist_name;`,
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

// Which of these artists had the highest energy songs?
async function trivia_answers_4(req, res) {
  connection.query(
    `select *
    from (
      with correct_answer as
              (
                  select a.artist_name
                  from Song_artist a join Song s on s.song_id=a.song_id
                  where a.song_id in (
                      select distinct song_id
                      from Billboard
                      where billboard_rank <= 100
                      )
                  Group By a.artist_name
                  order by avg(s.energy) desc
                  limit 1
              ),
          incorrect_answer as
              (
                  select a.artist_name
                  from Song_artist a join Song s on s.song_id=a.song_id
                  where a.song_id in (
                      select distinct song_id
                      from Billboard
                      where billboard_rank <= 100
                      )
                  Group By a.artist_name
                  order by avg(s.energy) asc
                  limit 3
              )

          select c.artist_name, 'Correct' as answer_choice
          from correct_answer c
          union
          select i.artist_name, 'Incorrect' as answer_choice
          from incorrect_answer i
      ) a
    order by a.artist_name;`,
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

// Which song is shown with the correct artist?
async function trivia_answers_5(req, res) {
  connection.query(
    `select *
    from (
      with correct_answer as
              (
                  select s.song_name, a.artist_name
                  from Song_artist a join Song s on s.song_id=a.song_id
                  where a.song_id in (
                      select distinct song_id
                      from Billboard
                      where billboard_rank <= 100
                      )
                  order by rand()
                  limit 1
              ),
          incorrect_answer as
              (
                  select s.song_name, a2.artist_name
                  from Song_artist a1
                  left join Song_artist a2 on a1.song_Id = (a2.song_Id + 100)
                  left join Song s on a1.song_id = s.song_id
                  where a1.song_id in (
                      select distinct song_id
                      from Billboard
                      where billboard_rank <= 100
                      )
                  and a1.artist_name <> a2.artist_name
                  order by rand()
                  limit 3)

          select concat(song_name, ' - ', artist_name) as artist_name, 'Correct' as answer_choice
          from correct_answer c
          union
          select concat(song_name, ' - ', artist_name) as artist_name, 'Incorrect' as answer_choice
          from incorrect_answer i
      ) a
      order by artist_name;`,
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


// Which song is shown with the correct soundtrack?
async function trivia_answers_6(req, res) {
  connection.query(
    `select *
    from (
      with correct_answer as
              (
                  select s.song_name, st.soundtrack_name
                  from Soundtrack_song sts
                  left join Song s on s.song_id=sts.song_id
                  left join Soundtrack st on sts.soundtrack_id = st.soundtrack_id
                  where s.song_id in (
                      select distinct song_id
                      from Billboard
                      where billboard_rank <= 100
                      )
                  order by rand()
                  limit 1
              ),
          incorrect_answer as
              (
                  select s.song_name, st.soundtrack_name
                  from Soundtrack_song sts1
                  left join Soundtrack_song sts2 on sts1.soundtrack_id = (sts2.soundtrack_id + 10)
                  left join Soundtrack st on sts1.soundtrack_id = st.soundtrack_id
                  left join Song s on sts2.song_id = s.song_id
                  where sts1.song_id in (
                      select distinct song_id
                      from Billboard
                      where billboard_rank <= 100
                      )
                  order by rand()
                  limit 3)

          select concat(song_name, ' - ', soundtrack_name) as artist_name, 'Correct' as answer_choice
          from correct_answer c
          union
          select concat(song_name, ' - ', soundtrack_name) as artist_name, 'Incorrect' as answer_choice
          from incorrect_answer i
      ) a
      order by artist_name;`,
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

// Which of these artists had songs with the most speech?
async function trivia_answers_7(req, res) {
  connection.query(
    `select *
    from (
      with correct_answer as
              (
                  select a.artist_name
                  from Song_artist a join Song s on s.song_id=a.song_id
                  where a.song_id in (
                      select distinct song_id
                      from Billboard
                      where billboard_rank <= 100
                      )
                  Group By a.artist_name
                  order by avg(s.speechiness) desc
                  limit 1
              ),
          incorrect_answer as
              (
                  select a.artist_name
                  from Song_artist a join Song s on s.song_id=a.song_id
                  where a.song_id in (
                      select distinct song_id
                      from Billboard
                      where billboard_rank <= 100
                      )
                  Group By a.artist_name
                  order by avg(s.speechiness) asc
                  limit 3
              )

          select c.artist_name, 'Correct' as answer_choice
          from correct_answer c
          union
          select i.artist_name, 'Incorrect' as answer_choice
          from incorrect_answer i
      ) a
    order by a.artist_name;`,
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

// Which of these artists had the most instrumental songs?
async function trivia_answers_8(req, res) {
  connection.query(
    `select *
    from (
      with correct_answer as
              (
                  select a.artist_name
                  from Song_artist a join Song s on s.song_id=a.song_id
                  where a.song_id in (
                      select distinct song_id
                      from Billboard
                      where billboard_rank <= 100
                      )
                  Group By a.artist_name
                  order by avg(s.instrumentalness) desc
                  limit 1
              ),
          incorrect_answer as
              (
                  select a.artist_name
                  from Song_artist a join Song s on s.song_id=a.song_id
                  where a.song_id in (
                      select distinct song_id
                      from Billboard
                      where billboard_rank <= 100
                      )
                  Group By a.artist_name
                  order by avg(s.instrumentalness) asc
                  limit 3
              )

          select c.artist_name, 'Correct' as answer_choice
          from correct_answer c
          union
          select i.artist_name, 'Incorrect' as answer_choice
          from incorrect_answer i
      ) a
    order by a.artist_name;`,
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

// Which of these artists had the slowest tempo songs?
async function trivia_answers_9(req, res) {
  connection.query(
    `select *
    from (
      with correct_answer as
              (
                  select a.artist_name
                  from Song_artist a join Song s on s.song_id=a.song_id
                  where a.song_id in (
                      select distinct song_id
                      from Billboard
                      where billboard_rank <= 100
                      )
                  Group By a.artist_name
                  order by avg(s.tempo) asc
                  limit 1
              ),
          incorrect_answer as
              (
                  select a.artist_name
                  from Song_artist a join Song s on s.song_id=a.song_id
                  where a.song_id in (
                      select distinct song_id
                      from Billboard
                      where billboard_rank <= 100
                      )
                  Group By a.artist_name
                  order by avg(s.tempo) desc 
                  limit 3
              )

          select c.artist_name, 'Correct' as answer_choice
          from correct_answer c
          union
          select i.artist_name, 'Incorrect' as answer_choice
          from incorrect_answer i
      ) a
    order by a.artist_name;`,
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

// Which genre is most similar to Elton John's songs?
async function trivia_answers_10(req, res) {
  connection.query(
    `SELECT * FROM (
      -- ## Search artist genres
                        WITH attributes as
                                 (SELECT artist_name,
                                         avg(s.danceability)     as artist_danceability,
                                         avg(s.energy)           as artist_energy,
                                         avg(s.loudness)         as artist_loudness,
                                         avg(s.speechiness)      as artist_speechiness,
                                         avg(s.acousticness)     as artist_acousticness,
                                         avg(s.instrumentalness) as artist_instrumentalness,
                                         avg(s.liveness)         as artist_liveness,
                                         avg(s.valence)          as artist_valence,
                                         avg(s.tempo)            as artist_tempo
                                  FROM Song_artist sa
                                           LEFT JOIN Song s on s.song_id = sa.song_id
                                  WHERE sa.artist_name = 'Elton John'
                                  GROUP BY sa.artist_name),
                            correct_genres as
                        (SELECT g.genre_name  as artist_genres,
                               abs((Select artist_danceability From attributes) - g.danceability)
                                   + abs((Select artist_energy From attributes) - g.energy)
                                   + abs((Select artist_loudness From attributes) - g.loudness) /
                                     ((Select max(Song.loudness) From Song) - (Select min(Song.loudness) From Song))
                                   + abs((Select artist_speechiness From attributes) - g.speechiness)
                                   + abs((Select artist_acousticness From attributes) - g.acousticness)
                                   + abs((Select artist_instrumentalness From attributes) - g.instrumentalness)
                                   + abs((Select artist_liveness From attributes) - g.liveness)
                                   + abs((Select artist_valence From attributes) - g.valence)
                                   + abs((Select artist_tempo From attributes) - g.tempo) /
                                     ((Select max(tempo) From Song) - (Select min(tempo) From Song)) as distance_score
                        FROM Genre g
                        ORDER BY abs((Select artist_danceability From attributes) - g.danceability)
                                     + abs((Select artist_energy From attributes) - g.energy)
                                     + abs((Select artist_loudness From attributes) - g.loudness) /
                                       ((Select max(Song.loudness) From Song) - (Select min(Song.loudness) From Song))
                                     + abs((Select artist_speechiness From attributes) - g.speechiness)
                                     + abs((Select artist_acousticness From attributes) - g.acousticness)
                                     + abs((Select artist_instrumentalness From attributes) - g.instrumentalness)
                                     + abs((Select artist_liveness From attributes) - g.liveness)
                                     + abs((Select artist_valence From attributes) - g.valence)
                                     + abs((Select artist_tempo From attributes) - g.tempo) /
                                       ((Select max(tempo) From Song) - (Select min(tempo) From Song))
                        LIMIT 1),
      
                         incorrect_genres as
                        (SELECT g.genre_name  as artist_genres,
                               abs((Select artist_danceability From attributes) - g.danceability)
                                   + abs((Select artist_energy From attributes) - g.energy)
                                   + abs((Select artist_loudness From attributes) - g.loudness) /
                                     ((Select max(Song.loudness) From Song) - (Select min(Song.loudness) From Song))
                                   + abs((Select artist_speechiness From attributes) - g.speechiness)
                                   + abs((Select artist_acousticness From attributes) - g.acousticness)
                                   + abs((Select artist_instrumentalness From attributes) - g.instrumentalness)
                                   + abs((Select artist_liveness From attributes) - g.liveness)
                                   + abs((Select artist_valence From attributes) - g.valence)
                                   + abs((Select artist_tempo From attributes) - g.tempo) /
                                     ((Select max(tempo) From Song) - (Select min(tempo) From Song)) as distance_score
                        FROM Genre g
                        ORDER BY abs((Select artist_danceability From attributes) - g.danceability)
                                     + abs((Select artist_energy From attributes) - g.energy)
                                     + abs((Select artist_loudness From attributes) - g.loudness) /
                                       ((Select max(Song.loudness) From Song) - (Select min(Song.loudness) From Song))
                                     + abs((Select artist_speechiness From attributes) - g.speechiness)
                                     + abs((Select artist_acousticness From attributes) - g.acousticness)
                                     + abs((Select artist_instrumentalness From attributes) - g.instrumentalness)
                                     + abs((Select artist_liveness From attributes) - g.liveness)
                                     + abs((Select artist_valence From attributes) - g.valence)
                                     + abs((Select artist_tempo From attributes) - g.tempo) /
                                       ((Select max(tempo) From Song) - (Select min(tempo) From Song)) Desc LIMIT 3)
      
                        SELECT artist_genres as artist_name, 'Correct' as answer_choice FROM correct_genres
                        UNION
                        SELECT artist_genres as artist_name, 'Incorrect' as answer_choice from incorrect_genres
      ) a
      ORDER BY artist_name`,
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
  trivia_question,
  trivia_info,
  trivia_answers_1,
  trivia_answers_2,
  trivia_answers_3,
  trivia_answers_4,
  trivia_answers_5,
  trivia_answers_6,
  trivia_answers_7,
  trivia_answers_8,
  trivia_answers_9,
  trivia_answers_10
};
