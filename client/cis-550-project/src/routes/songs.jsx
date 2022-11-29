import { Fade } from 'react-awesome-reveal';

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
import { Favorite, ShareOption } from 'grommet-icons';

import { useState } from 'react';

export default function Songs() {
  const [value, setValue] = useState('');
  const [currentSong, setCurrentSong] = useState({ name: 'Song Title', artist: 'Artist', genre: 'Genre' })

  const onChange = (event) => setValue(event.target.value);

  const songs = [
    { name: 'Elanor rigby', artist: 'Bob John', genre: 'jazz' },
    { name: 'Just Dance', artist: 'Bob John', genre: 'jazz' },
    { name: 'Janey Yellen', artist: 'Bob John', genre: 'jazz' },
    { name: 'Apple Pie', artist: 'Bob John', genre: 'jazz' },
    { name: 'Yellow Submarine', artist: 'Bob John', genre: 'jazz' },
  ];

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
              <Box
                flex={false}
                pad="medium"
                background={`dark-${(item % 3) + 1}`}
                border={{ color: 'brand', size: 'small' }}
                elevation="large"
              >
                <Text>{item.name}</Text>
              </Box>
            )}
          </InfiniteScroll>
        </Box>
        <Box>
          <Card height="medium" width="medium" background="light-4">
            <CardHeader pad="medium">{currentSong.name}</CardHeader>
            <CardBody pad="medium">
              Other Song Information: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
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
