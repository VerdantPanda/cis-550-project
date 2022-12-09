// Please see the following links:
// https://v2.grommet.io/components
// Also see songs.jsx

//Comment test
// export default function Recommendations() {
//   return <div>recommendations react component</div>;
// }
//TODO: ibrahim finish this
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

import { search_song_by_name } from '../network.js';

import { song_recommendations } from '../network.js';

import { Favorite, ShareOption } from 'grommet-icons';

import { useState, useEffect } from 'react';

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  // return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  return minutes + ' minutes and ' + seconds + ' seconds';
}

export default function Recommendations() {
  // TODO: make call to server
  useEffect(() => {
    const fechData = async () => {
      console.log('useEffectCalled_r');
      let temp = await search_song_by_name('Some Feeling');
      console.log('TEMP DATA:');
      console.log(temp);
      setSongDataList(temp);
      setSongs(temp);
    };
    fechData();
  }, []);

  // useEffect(() => {
  //   const fechData2 = async () => {
  //     console.log('useEffectCalled_rec');

  //     let temp2 = await song_recommendations(7215);
  //     console.log('TEMP DATA_2:');
  //     console.log(temp2);
  //     console.log(recommendedSongs);
  //     setRecommendedSongs(temp2);
  //   };
  //   fechData2();
  // }, []);

  const [value, setValue] = useState('');
  const [song_data_list, setSongDataList] = useState([]);
  const [songs, setSongs] = useState([]);

  const [currentSong, setCurrentSong] = useState({
    song_name: '-',
    song_id: 0,
    album: '',
    explicit: 0,
    duration_ms: 0,
    song_year: 0,
  });

  const [recommendedSongs, setRecommendedSongs] = useState([]);

  const onChange = (event) => {
    setValue(event.target.value);
    if (value.length > 1) {
      setSongs(
        song_data_list.filter((song) => {
          return song.song_name.includes(value.trim());
        })
      );
    } else {
      setSongs(song_data_list);
    }
  };

  return !song_data_list.length === 0 ? (
    <Box
      fill
      align="center"
      justify="start"
      pad="large"
      gap="medium"
      animation="fadeIn"
    >
      <Spinner size="xlarge"></Spinner>
    </Box>
  ) : (
    <Box
      fill
      align="center"
      justify="start"
      pad="large"
      gap="medium"
      animation="fadeIn"
    >
      <Text size="xlarge" textAlign="start" weight="lighter">
        Type in the name of a song and click it to retrieve relevant
        information.<br></br>If nothing immediately shows up, click the{' '}
        <b>Search</b> button to do a deep search of our database.
      </Text>
      <Box width="medium" fill="horizontal" direction="row">
        <TextInput
          id="grommet-text-combobox-default-suggestion"
          value={value}
          onChange={onChange}
          placeholder="Enter the name of a song"
        />
        <Box pad={{ horizontal: 'small' }}>
          <Button
            size="large"
            primary
            label="Search "
            onClick={async (e) => {
              console.log('Search button clicked');
              let temp = await search_song_by_name(value);
              console.log('TEMP DATA:');
              console.log(temp);

              if (temp.length === 0) {
                temp = [
                  {
                    song_name: 'Song Not Found',
                    song_id: 0,
                    album: '',
                    explicit: 0,
                    duration_ms: 0,
                    song_year: 0,
                  },
                ];
              }
              setSongDataList(temp);
              setSongs(temp);
            }}
          ></Button>
        </Box>
      </Box>
      <Box direction="row" fill={true} gap="small">
        <Box
          height="100%"
          fill="horizontal"
          overflow="auto"
          background={{ color: 'neutral-2' }}
        >
          <InfiniteScroll items={songs} step={5}>
            {(item) => (
              <Fade key={item.song_id}>
                <Box
                  flex={false}
                  pad="medium"
                  margin="small"
                  background={`dark-${(item % 3) + 1}`}
                  border={{ color: 'brand', size: 'small' }}
                  elevation="large"
                  onClick={async() => {
                    setCurrentSong(item);

                    console.log('Query button clicked');
                    let temp = await song_recommendations(item.song_id);
                    console.log('TEMP DATA:');
                    console.log(temp);

                    setRecommendedSongs(temp);
                  }}
                >
                  <Text>{item.song_name}</Text>
                </Box>
              </Fade>
            )}
          </InfiniteScroll>
        </Box>
        <Box>
        <Text size="large"> {' '}<b>Song Info</b></Text>
          <Card height="xlarge" width="large" background="light-4">
            <CardHeader pad="medium">
              <Text size="large"> {currentSong.song_name}:</Text>
            </CardHeader>

            <CardBody pad="medium">
              <Text
                size="small"
                textAlign="start"
                margin={{ bottom: 'medium' }}
              >
                Album: {currentSong.album}
                <br />
                <br />
                Year: {currentSong.song_year}
                <br />
                <br />
                {millisToMinutesAndSeconds(currentSong.duration_ms)}
                <br />
                <br />
                {currentSong.explicit ? 'Explicit' : null}
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
        <Text size="large"> {' '}<b>Recommended Songs</b></Text>
          <Box
            height="100%"
            fill="horizontal"
            overflow="auto"
            background={{ color: 'neutral-2' }}
          >
            <InfiniteScroll items={recommendedSongs} step={5}>
              {(item) => (
                <Fade key={item.song_id}>
                  <Box
                    flex={false}
                    pad="medium"
                    margin="small"
                    background={`dark-${(item % 3) + 1}`}
                    border={{ color: 'brand', size: 'small' }}
                    elevation="large"
                    onClick={() => {
                      setCurrentSong(item);
                      
                      //setRecommendedSongs(song_recommendations(currentSong.song_id));
                    }}
                  >
                    <Text>{item.song_name}</Text>
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
