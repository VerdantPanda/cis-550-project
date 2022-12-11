// Please see the following links:
// https://v2.grommet.io/components
// Also see songs.jsx

import { Fade, AttentionSeeker } from 'react-awesome-reveal';

import {
  Box,
  TextInput,
  InfiniteScroll,
  Text,
  TableRow,
  TableBody,
  Table,
  TableHeader,
  TableCell,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Spinner,
  List,
} from 'grommet';

import {
  search_artist_by_name,
  artist_genres,
  recommended_artists,
} from '../network.js';

import { Favorite, ShareOption } from 'grommet-icons';

import { useState, useEffect } from 'react';

export default function Artists() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log('useEffectCalled');
  //     let lst = await search_artist_by_name(value);
  //     console.log('search_artist_by_name()');
  //     // console.log(lst);
  //     setArtists(lst);
  //   };
  //   fetchData();
  // }, []);

  const [value, setValue] = useState('');
  // const [genres_data_list, setGenresDataList] = useState([]);
  const [artists, setArtists] = useState([]);

  const [currentArtist, setCurrentArtist] = useState('');

  const [currentGenres, setCurrentGenres] = useState([
    
  ]);

  const [currentRecommendation, setCurrentRecommendation] = useState([
    
  ]);

  const onChange = async (event) => {
    setValue(event.target.value);
    let lst = await search_artist_by_name(event.target.value);
    setArtists(lst);
  };

  return (
    <Box
      fill
      align="center"
      justify="start"
      pad="large"
      gap="medium"
      animation="fadeIn"
    >
      <Text size="xlarge" textAlign="start" weight="lighter">
        Type in the name of an artist and click it to retrieve relevant
        information.
      </Text>
      <Box width="medium" fill="horizontal">
        <TextInput
          id="grommet-text-combobox-default-suggestion"
          value={value}
          onChange={onChange}
          placeholder="Enter the name of an artist"
        />
      </Box>
      <Box direction="row" fill={true} gap="small">
        <Box
          height="100%"
          fill="horizontal"
          overflow="auto"
          background={{ color: 'neutral-2' }}
        >
          <InfiniteScroll items={artists} step={5}>
            {(item) => (
              <Fade>
                <Box
                  flex={false}
                  pad="medium"
                  margin="small"
                  background={`dark-${(item % 3) + 1}`}
                  border={{ color: 'brand', size: 'small' }}
                  elevation="large"
                  onClick={async () => {
                    setCurrentGenres([{ artist_genres: 'Loading...' }]);
                    setCurrentRecommendation([
                      {
                        song_id: 0,
                        recommended_artists: 'Loading...',
                      },
                    ]);

                    setCurrentArtist(item.artist_name);

                    let recmd = await recommended_artists(item.artist_name);
                    let genre = await artist_genres(item.artist_name);

                    if (recmd) {
                      setCurrentRecommendation(recmd);
                    }
                    if (genre) {
                      setCurrentGenres(genre);
                    }
                    // console.log(item.artist_name);
                    console.log(currentArtist);
                    console.log(currentGenres);
                    console.log(currentRecommendation);
                  }}
                >
                  <Text>{item.artist_name}</Text>
                </Box>
              </Fade>
            )}
          </InfiniteScroll>
        </Box>
        <Box>
        <Text size="large"> {' '}<b>Artist Info</b></Text>
          <Card height="xlarge" width="large" background="light-4">
            <CardHeader pad="medium">
              <Text size="large">{currentArtist}</Text>
            </CardHeader>

            <CardBody pad="medium">
              <Text
                size="medium"
                textAlign="start"
                margin={{ bottom: 'medium' }}
              >
                {/* <List primaryKey="artist_genres" data={currentGenres} />
                */}
                <b>Genres:</b>{' '}
                <br></br>
                {currentGenres.map((elem) => <li>{elem.artist_genres}</li>, <br></br>)}
              </Text>
            </CardBody>
            <CardFooter pad={{ horizontal: 'small' }} background="light-2">
              <Button icon={<Favorite color="red" />} hoverIndicator />
              <Button icon={<ShareOption color="plain" />} hoverIndicator />
            </CardFooter>
          </Card>
        </Box>
        <Box direction="row" fill={true} gap="small">
        <Box>
        <Text size="large"> {' '}<b>Recommended Artists</b></Text>
          <Box
            height="100%"
            fill="horizontal"
            overflow="auto"
            background={{ color: 'neutral-2' }}
          >
            <InfiniteScroll items={currentRecommendation} step={5}>
              {(item) => (
                <Fade>
                  <Box
                    flex={false}
                    pad="medium"
                    margin="small"
                    background={`dark-${(item % 3) + 1}`}
                    border={{ color: 'brand', size: 'small' }}
                    elevation="large"
                  >
                    <Text>{item.recommended_artists}</Text>
                  </Box>
                </Fade>
              )}
            </InfiniteScroll>
          </Box>
        </Box>
      </Box>
      </Box>
    </Box>
  );
}
