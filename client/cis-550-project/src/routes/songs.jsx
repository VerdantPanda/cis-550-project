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
} from 'grommet';

import { search_song_by_name } from '../network.js';

import { Favorite, ShareOption } from 'grommet-icons';

import { useState, useEffect } from 'react';

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  // return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  return minutes + ' minutes and ' + seconds + ' seconds';
}

export default function Songs() {
  // TODO: make call to server
  useEffect(() => {
    const fechData = async () => {
      console.log('useEffectCalled');
      let temp = await search_song_by_name('Waterloo');
      console.log('TEMP DATA:');
      console.log(temp);
      setSongDataList(temp);
    };
    // fechData();
  }, []);

  // const song_data_list = [
  //   {
  //     song_name: 'Elanor rigby',
  //     album: 'Beatlemania',
  //     explicit: 0,
  //     duration_ms: 200000,
  //     song_year: 2000,
  //   },
  //   {
  //     song_name: 'Just Dance',
  //     album: 'KidzBop IV',
  //     explicit: 0,
  //     duration_ms: 200000,
  //     song_year: 2000,
  //   },
  //   {
  //     song_name: 'Janey Yellen',
  //     album: 'The Economist',
  //     explicit: 1,
  //     duration_ms: 200000,
  //     song_year: 2000,
  //   },
  //   {
  //     song_name: 'Apple Pie',
  //     album: 'As American as...',
  //     explicit: 0,
  //     duration_ms: 200000,
  //     song_year: 2000,
  //   },
  //   {
  //     song_name: 'Yellow Submarine',
  //     album: 'Abby Road',
  //     explicit: 1,
  //     duration_ms: 200000,
  //     song_year: 2000,
  //   },
  // ];

  const [value, setValue] = useState('');
  const [song_data_list, setSongDataList] = useState([]);
  const [songs, setSongs] = useState([]);

  const [currentSong, setCurrentSong] = useState({
    song_name: 'Again The Waterloo',
    song_id: 190624,
    album: 'Calling Zero',
    explicit: 0,
    duration_ms: 207253,
    song_year: 2002,
  });

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
          placeholder="Enter the name of a song"
        />
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
                  onClick={() => {
                    setCurrentSong(item);
                  }}
                >
                  <Text>{item.song_name}</Text>
                </Box>
              </Fade>
            )}
          </InfiniteScroll>
        </Box>
        <Box>
          <Card height="medium" width="medium" background="light-4">
            <CardHeader pad="medium">
              <Text size="large">{currentSong.song_name}</Text>
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
      </Box>
    </Box>
  );
}
