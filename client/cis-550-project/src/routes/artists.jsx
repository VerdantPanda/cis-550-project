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

import { search_artist_by_name } from '../network.js';

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
    // useEffect(() => { });
    if (event.target.value.length > 0) {
      setValue(event.target.value);
      console.log(value);
      console.log(1);
      console.log(event.target.value);
    } else {
      setValue('');
      console.log(value);
      console.log(2);
    }
    console.log(3);
    console.log(event.target.value);
    console.log(value);
    fechData();
  
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
                  onClick={() => {
                    setCurrentArtist(item);
                    setCurrentGenres(item);
                    setCurrentRecommendation(item);
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
              Album
                {/* Album: {currentSong.album}
                <br />
                <br />
                Year: {currentSong.song_year}
                <br />
                <br />
                {millisToMinutesAndSeconds(currentSong.duration_ms)}
                <br />
                <br />
                {currentSong.explicit ? 'Explicit' : null} */}
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