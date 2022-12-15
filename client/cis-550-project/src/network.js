import axios from 'axios';
const FormData = require('form-data');

// const ImageSearchAPI = require('@azure/cognitiveservices-imagesearch');
// const ImageSearchAPIClient = ImageSearchAPI.ImageSearchClient;
// const CognitiveServicesCredentials =
//   require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;

const serverAddress = 'http://localhost:8080';

async function artist_genres(ArtistName) {
  return axios
    .get(serverAddress + '/artist/genres', { params: { ArtistName } })
    .then((response) => {
      return response.data.results;
    });
}

async function recommended_artists(ArtistName) {
  return axios
    .get(serverAddress + '/artist/recommended', { params: { ArtistName } })
    .then((response) => {
      return response.data.results;
    });
}

async function search_artists_from_genres(GenreName) {
  return axios
    .get(
      serverAddress + '/artist/searchfromgenre',

      { params: { GenreName } }
    )
    .then((response) => {
      return response.data.results;
    });
}

async function search_song_by_name(SongName) {
  return axios
    .get(serverAddress + '/song/search', { params: { SongName: SongName } })
    .then((response) => {
      return response.data.results;
    });
}

async function search_artist_by_name(ArtistName) {
  return axios
    .get(serverAddress + '/artist/search', {
      params: { ArtistName: ArtistName },
    })
    .then((response) => {
      return response.data.results;
    });
}

async function song_info(SongId) {
  return axios
    .get(serverAddress + '/song/info', { params: { SongId } })
    .then((response) => {
      return response.data.results;
    });
}

async function songs_by_artist_1weekbillboard(ArtistName) {
  return axios
    .get(serverAddress + '/song/1weekbillboard', { params: { ArtistName } })
    .then((response) => {
      return response.data.results;
    });
}

async function song_recommendations(SongId) {
  return axios
    .get(serverAddress + '/song/recommended', { params: { SongId } })
    .then((response) => {
      return response.data.results;
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

async function trivia_answers_1(QuestionId) {
  return axios
    .get(serverAddress + '/triviaanswers_1', { params: { QuestionId } })
    .then((response) => {
      return response.data.results;
    });
}

async function trivia_answers_2(QuestionId) {
  return axios
    .get(serverAddress + '/triviaanswers_2', { params: { QuestionId } })
    .then((response) => {
      return response.data.results;
    });
}

async function trivia_answers_3(QuestionId) {
  return axios
    .get(serverAddress + '/triviaanswers_3', { params: { QuestionId } })
    .then((response) => {
      return response.data.results;
    });
}

async function trivia_answers_4(QuestionId) {
  return axios
    .get(serverAddress + '/triviaanswers_4', { params: { QuestionId } })
    .then((response) => {
      return response.data.results;
    });
}

async function trivia_answers_5(QuestionId) {
  return axios
    .get(serverAddress + '/triviaanswers_5', { params: { QuestionId } })
    .then((response) => {
      return response.data.results;
    });
}

async function trivia_answers_6(QuestionId) {
  return axios
    .get(serverAddress + '/triviaanswers_6', { params: { QuestionId } })
    .then((response) => {
      return response.data.results;
    });
}

async function trivia_answers_7(QuestionId) {
  return axios
    .get(serverAddress + '/triviaanswers_7', { params: { QuestionId } })
    .then((response) => {
      return response.data.results;
    });
}

async function trivia_answers_8(QuestionId) {
  return axios
    .get(serverAddress + '/triviaanswers_8', { params: { QuestionId } })
    .then((response) => {
      return response.data.results;
    });
}

async function trivia_answers_9(QuestionId) {
  return axios
    .get(serverAddress + '/triviaanswers_9', { params: { QuestionId } })
    .then((response) => {
      return response.data.results;
    });
}

async function trivia_answers_10(QuestionId) {
  return axios
    .get(serverAddress + '/triviaanswers_10', { params: { QuestionId } })
    .then((response) => {
      return response.data.results;
    });
}

async function create_user(username, password) {
  const response = await fetch(serverAddress + '/user', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}

async function login(username, password) {
  const response = await fetch(serverAddress + '/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}

async function setUserSongs(userid, songs) {
  const data = new FormData();
  data.append('userid', userid);
  data.append('songs', songs);
  return axios.put(serverAddress + '/user/songs', data).then((response) => {
    return response.data.results;
  });
}

async function getUserSongs(userid) {
  const data = new FormData();
  data.append('userid', userid);
  return axios.get(serverAddress + '/user/songs', data).then((response) => {
    return response.data.results;
  });
}

async function getAlbumImage(albumName) {
  let subscriptionKey = 'b20665ee28d54fada3cc196f4cefcb00';
  let host = 'api.bing.microsoft.com';
  let path = '/v7.0/images/search';
  let term = albumName + ' album cover';

  const response = await fetch(
    'https://' + host + path + '?q=' + encodeURIComponent(term),
    {
      method: 'get',
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
      // body: JSON.stringify({ name: 'val' }),
    }
  );
  const resJson = await response.json();
  if (resJson.value[0].contentUrl) {
    return resJson.value[0].contentUrl;
  }

  return '//v2.grommet.io/assets/Wilderpeople_Ricky.jpg';
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
  trivia_answers_10,
  create_user,
  login,
  setUserSongs,
  getUserSongs,
  getAlbumImage,
};
