import './App.css';

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import Root from './routes/root';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

// List of Features
// We will be implementing the following features:
// Search by song name - will give information in a dashboard
// Search by artist - will give a list of songs by that artist in a dashboard
// Search by other features such as acousticness, danceability valence, etc - will give a list of songs in a dashboard
// Song Recommendation - given a a song, a list of recommended songs will be given in a dashboard

// The following feature will be implemented if we are left with enough time:
// Trivia - Game-like trivia where questions will be asked based on songs from the data

// List of Pages
// The website is expected to have the following pages:
// Introductory Page: This page will present an introductory message to the website, and will contain buttons to navigate to all other pages that contain the features of our web application.
// Search for Song: This page will act as a search engine for all songs in the database. The user will enter the name of the song, which will return all details and Spotify features about that song.
// Search for Artist: The user will be able to use this page to search for a specific artist. The page will contain information about the artist as well as all the songs by that artist in the database.
// Song Recommendation: This page will be used to search for similar songs based on an artist or a song. The search will be based on the Spotify features of the song or the artist.
// Trivia: This page will have a game-like trivia where the user will be asked random questions/facts about different songs/artists. The user’s responses will be scored at the end, which will be shown on the page.
