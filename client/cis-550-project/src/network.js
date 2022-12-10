import axios from 'axios';

const serverAddress = 'http://localhost:3001';

async function artist_genres(ArtistName) {
  axios
    .get(serverAddress + '/artist/genres', { params: { ArtistName } })
    .then((response) => {
      console.log(response.data);
    });
}

async function recommended_artists(ArtistName) {
  return axios
    .get(serverAddress + '/artist/recommended', { params: { ArtistName } })
    .then((response) => {
      // console.log(response.data);
      return response.data.results;
    });
}

async function search_artists_from_genres(GenreName) {
  axios
    .get(
      serverAddress + '/artist/searchfromgenre',

      { params: { GenreName } }
    )
    .then((response) => {
      console.log(response.data.results);
    });
}

async function search_song_by_name(SongName) {
  return axios
    .get(serverAddress + '/song/search', { params: { SongName: SongName } })
    .then((response) => {
      //console.log(response.data);
      return response.data.results;
    });
}

async function search_artist_by_name(ArtistName) {
  return axios
    .get(serverAddress + '/artist/search', {
      params: { ArtistName: ArtistName },
    })
    .then((response) => {
      //   console.log(response.data);
      return response.data.results;
    });
}

async function song_info(SongId) {
  axios
    .get(serverAddress + '/song/info', { params: { SongId } })
    .then((response) => {
      console.log(response.data);
    });
}

async function songs_by_artist_1weekbillboard(ArtistName) {
  axios
    .get(serverAddress + '/song/1weekbillboard', { params: { ArtistName } })
    .then((response) => {
      console.log(response.data);
    });
}

async function song_recommendations(SongId) {
  return axios
    .get(serverAddress + '/song/recommended', { params: { SongId } })
    .then((response) => {
      console.log(response.data.results);
      return response.data.results;
    });
}

async function trivia_question_1() {
  return axios.get(serverAddress + '/trivia1', {}).then((response) => {
    return response.data.results;
  });
}

async function trivia_question_2() {
  axios.get(serverAddress + '/trivia2', {}).then((response) => {
    console.log(response.data);
  });
}

async function trivia_question_3() {
  axios.get(serverAddress + '/trivia3', {}).then((response) => {
    console.log(response.data);
  });
}

async function trivia_question(QuestionId) {
  return axios
    .get(serverAddress + '/triviaquestion', { params: { QuestionId } })
    .then((response) => {
      return response.data.results;
    });
}
async function trivia_info(QuestionId) {
  return axios
    .get(serverAddress + '/triviainfo', { params: { QuestionId } })
    .then((response) => {
      return response.data.results;
    });
}

async function trivia_answers(QuestionId) {
  return axios
    .get(serverAddress + '/triviaanswers', { params: { QuestionId } })
    .then((response) => {
      return response.data.results;
    });
}

export {
  artist_genres,
  recommended_artists,
  search_artists_from_genres,
  search_song_by_name,
  search_artist_by_name,
  song_info,
  songs_by_artist_1weekbillboard,
  song_recommendations,
  trivia_question_1,
  trivia_question_2,
  trivia_question_3,
  trivia_question,
  trivia_info,
  trivia_answers,
};
