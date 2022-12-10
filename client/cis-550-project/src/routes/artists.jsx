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
} from 'grommet';

import { search_artist_by_name, artist_genres, recommended_artists } from '../network.js';

import { Favorite, ShareOption } from 'grommet-icons';

import { useState, useEffect } from 'react';

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  // return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  return minutes + ' minutes and ' + seconds + ' seconds';
}

export default function Artists() {
  const [value, setValue] = useState('');
  // const [genres_data_list, setGenresDataList] = useState([]);
  const [artists, setArtists] = useState([]);

  const fechData = async () => {
    console.log('useEffectCalled');
    let lst = await search_artist_by_name(value);
    console.log('TEMP DATA:');
    console.log(lst);
    setArtists(lst);
  };
  // fechData();

  const [currentArtist, setCurrentArtist] = useState('');

  const [currentGenres, setCurrentGenres] = useState({
    artist_genres: [],
  });
  const [currentRecommendation, setCurrentRecommendation] = useState({
    recommended_artists: [],
  });

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
                  onClick={ async () => {
                    setCurrentArtist(item.artist_name);
                    let recmd = recommended_artists(item.artist_name);
                    let genre = artist_genres(item.artist_name);
                    if (recmd) {
                      setCurrentRecommendation(recmd);
                    }
                    if (genre) {
                      setCurrentGenres(genre);
                    }
                    console.log(item.artist_name);
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
          <Card height="medium" width="medium" background="light-4">
            <CardHeader pad="medium">
              <Text size="large">{currentArtist}</Text>
            </CardHeader>

            <CardBody pad="medium">
              <Text
                size="small"
                textAlign="start"
                margin={{ bottom: 'medium' }}
              >
                {currentGenres.artist_genres}
                {currentRecommendation.recommended_artists}
                
              </Text>
            </CardBody>
            <CardFooter pad={{ horizontal: 'small' }} background="light-2">
              <Button icon={<Favorite color="red" />} hoverIndicator />
              <Button icon={<ShareOption color="plain" />} hoverIndicator />
            </CardFooter>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
